export interface AnalysisResult {
  status: "red" | "yellow" | "green"
  message: string
  details: string[]
  score: number
  recommendations: string[]
}

export interface ResumeMetrics {
  fileSize: number
  fileName: string
  fileType: string
  hasGoodNaming: boolean
  isPDF: boolean
  estimatedWordCount: number
  hasKeywords: boolean
}

export class ResumeAnalyzer {
  private static readonly KEYWORDS = [
    // Skills
    "experience",
    "skills",
    "education",
    "projects",
    "achievements",
    "responsibilities",
    "managed",
    "developed",
    "created",
    "implemented",
    "improved",
    "increased",
    "leadership",
    "team",
    "collaboration",
    "communication",
    "problem-solving",
    // Technical
    "javascript",
    "python",
    "java",
    "react",
    "node",
    "sql",
    "aws",
    "docker",
    "git",
    "agile",
    "scrum",
    "api",
    "database",
    "frontend",
    "backend",
    // Professional
    "bachelor",
    "master",
    "degree",
    "certification",
    "internship",
    "volunteer",
    "award",
    "recognition",
    "publication",
    "presentation",
  ]

  private static readonly OPTIMAL_SIZE_MIN = 80000 // ~80KB
  private static readonly OPTIMAL_SIZE_MAX = 800000 // ~800KB
  private static readonly MIN_VIABLE_SIZE = 30000 // ~30KB
  private static readonly MAX_REASONABLE_SIZE = 2000000 // ~2MB

  static async analyzeResume(file: File, content: Buffer): Promise<AnalysisResult> {
    const metrics = this.extractMetrics(file, content)
    const score = this.calculateScore(metrics)
    const { status, message } = this.determineStatus(score)
    const details = this.generateDetails(metrics, score)
    const recommendations = this.generateRecommendations(metrics, score)

    return {
      status,
      message,
      details,
      score,
      recommendations,
    }
  }

  private static extractMetrics(file: File, content: Buffer): ResumeMetrics {
    const fileName = file.name.toLowerCase()
    const fileSize = file.size
    const fileType = file.type

    // Check for professional naming
    const hasGoodNaming = this.checkNaming(fileName)

    // Check if PDF (preferred format)
    const isPDF = fileType === "application/pdf" || fileName.endsWith(".pdf")

    // Estimate word count based on file size and type
    const estimatedWordCount = this.estimateWordCount(fileSize, isPDF)

    // Check for resume keywords in filename
    const hasKeywords = this.checkFilenameKeywords(fileName)

    return {
      fileSize,
      fileName,
      fileType,
      hasGoodNaming,
      isPDF,
      estimatedWordCount,
      hasKeywords,
    }
  }

  private static checkNaming(fileName: string): boolean {
    const goodPatterns = [
      /resume/i,
      /cv/i,
      /curriculum/i,
      /vitae/i,
      // Check for name patterns like "john_doe_resume"
      /[a-z]+[_-][a-z]+[_-](resume|cv)/i,
      // Check for professional patterns
      /(resume|cv)[_-]\d{4}/i, // resume_2024
    ]

    return goodPatterns.some((pattern) => pattern.test(fileName))
  }

  private static checkFilenameKeywords(fileName: string): boolean {
    const professionalKeywords = [
      "senior",
      "junior",
      "lead",
      "manager",
      "developer",
      "engineer",
      "analyst",
      "specialist",
      "coordinator",
      "director",
      "consultant",
    ]

    return professionalKeywords.some((keyword) => fileName.includes(keyword))
  }

  private static estimateWordCount(fileSize: number, isPDF: boolean): number {
    // Rough estimation: PDF ~10-15 bytes per word, DOC/DOCX ~20-30 bytes per word
    const bytesPerWord = isPDF ? 12 : 25
    return Math.floor(fileSize / bytesPerWord)
  }

  private static calculateScore(metrics: ResumeMetrics): number {
    let score = 0
    const maxScore = 100

    // File size scoring (25 points)
    if (metrics.fileSize >= this.OPTIMAL_SIZE_MIN && metrics.fileSize <= this.OPTIMAL_SIZE_MAX) {
      score += 25
    } else if (metrics.fileSize >= this.MIN_VIABLE_SIZE && metrics.fileSize <= this.MAX_REASONABLE_SIZE) {
      score += 15
    } else if (metrics.fileSize >= this.MIN_VIABLE_SIZE) {
      score += 10
    }

    // File format scoring (20 points)
    if (metrics.isPDF) {
      score += 20
    } else if (metrics.fileType.includes("word") || metrics.fileType.includes("document")) {
      score += 15
    }

    // Naming convention scoring (20 points)
    if (metrics.hasGoodNaming) {
      score += 15
    }
    if (metrics.hasKeywords) {
      score += 5
    }

    // Word count scoring (20 points)
    if (metrics.estimatedWordCount >= 300 && metrics.estimatedWordCount <= 800) {
      score += 20 // Optimal range
    } else if (metrics.estimatedWordCount >= 200 && metrics.estimatedWordCount <= 1200) {
      score += 15 // Good range
    } else if (metrics.estimatedWordCount >= 100) {
      score += 10 // Acceptable
    }

    // Professional indicators (15 points)
    const fileName = metrics.fileName
    if (fileName.includes("2024") || fileName.includes("2023")) {
      score += 5 // Recent
    }
    if (!fileName.includes("draft") && !fileName.includes("temp") && !fileName.includes("old")) {
      score += 5 // Not a draft
    }
    if (fileName.length > 10 && fileName.length < 50) {
      score += 5 // Reasonable filename length
    }

    return Math.min(score, maxScore)
  }

  private static determineStatus(score: number): { status: "red" | "yellow" | "green"; message: string } {
    if (score >= 75) {
      return {
        status: "green",
        message: "Your resume looks great and is ready for applications!",
      }
    } else if (score >= 45) {
      return {
        status: "yellow",
        message: "Your resume has potential but requires some enhancements.",
      }
    } else {
      return {
        status: "red",
        message: "Your resume needs significant improvements to be competitive.",
      }
    }
  }

  private static generateDetails(metrics: ResumeMetrics, score: number): string[] {
    const details: string[] = []

    // File size analysis
    if (metrics.fileSize < this.MIN_VIABLE_SIZE) {
      details.push("Resume appears too short - may lack sufficient detail")
    } else if (metrics.fileSize > this.MAX_REASONABLE_SIZE) {
      details.push("Resume file is quite large - consider condensing content")
    } else if (metrics.fileSize >= this.OPTIMAL_SIZE_MIN && metrics.fileSize <= this.OPTIMAL_SIZE_MAX) {
      details.push("File size is in the optimal range")
    }

    // Format analysis
    if (metrics.isPDF) {
      details.push("PDF format ensures consistent formatting across devices")
    } else {
      details.push("Consider converting to PDF for better compatibility")
    }

    // Naming analysis
    if (metrics.hasGoodNaming) {
      details.push("Professional file naming detected")
    } else {
      details.push("Consider renaming file to include 'resume' or 'CV'")
    }

    // Word count analysis
    if (metrics.estimatedWordCount < 200) {
      details.push("Resume may be too brief - consider adding more detail")
    } else if (metrics.estimatedWordCount > 1000) {
      details.push("Resume may be too lengthy - consider condensing")
    } else {
      details.push(`Estimated ${metrics.estimatedWordCount} words - good length`)
    }

    // Overall score
    details.push(`Overall score: ${score}/100`)

    return details
  }

  private static generateRecommendations(metrics: ResumeMetrics, score: number): string[] {
    const recommendations: string[] = []

    if (score < 75) {
      if (!metrics.isPDF) {
        recommendations.push("Convert your resume to PDF format")
      }

      if (!metrics.hasGoodNaming) {
        recommendations.push("Rename file to include your name and 'resume' (e.g., 'john_doe_resume.pdf')")
      }

      if (metrics.fileSize < this.OPTIMAL_SIZE_MIN) {
        recommendations.push("Add more detail about your experience and achievements")
      }

      if (metrics.fileSize > this.OPTIMAL_SIZE_MAX) {
        recommendations.push("Condense content to 1-2 pages maximum")
      }

      if (metrics.estimatedWordCount < 300) {
        recommendations.push("Include more specific examples of your accomplishments")
      }

      if (score < 45) {
        recommendations.push("Consider using a professional resume template")
        recommendations.push("Have someone review your resume for content and formatting")
      }
    }

    if (recommendations.length === 0) {
      recommendations.push("Your resume meets professional standards!")
    }

    return recommendations
  }
}
