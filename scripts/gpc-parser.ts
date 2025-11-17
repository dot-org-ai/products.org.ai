/**
 * GS1 Global Product Classification (GPC) Parser
 * Parses GS1 GPC hierarchy data
 */

export interface GPCBrick {
  code: string
  name: string
  description?: string
  class: GPCClass
}

export interface GPCClass {
  code: string
  name: string
  description?: string
  family: GPCFamily
}

export interface GPCFamily {
  code: string
  name: string
  description?: string
  segment: GPCSegment
}

export interface GPCSegment {
  code: string
  name: string
  description?: string
}

export interface GPCClassification {
  segment: string
  segmentName: string
  family: string
  familyName: string
  class: string
  className: string
  brick: string
  brickName: string
}

// Sample GS1 GPC data - In production, this would be loaded from GS1 official data
const GPC_DATA: Record<string, GPCBrick> = {
  '50101501': {
    code: '50101501',
    name: 'Shampoo',
    description: 'Hair cleaning products',
    class: {
      code: '50101500',
      name: 'Hair Care',
      description: 'Products for hair care and styling',
      family: {
        code: '50100000',
        name: 'Personal Hygiene Products',
        description: 'Products for personal hygiene and cleanliness',
        segment: {
          code: '50000000',
          name: 'Beauty/Personal Care/Hygiene',
          description: 'Beauty, personal care, and hygiene products'
        }
      }
    }
  },
  '50101502': {
    code: '50101502',
    name: 'Conditioner',
    description: 'Hair conditioning products',
    class: {
      code: '50101500',
      name: 'Hair Care',
      description: 'Products for hair care and styling',
      family: {
        code: '50100000',
        name: 'Personal Hygiene Products',
        description: 'Products for personal hygiene and cleanliness',
        segment: {
          code: '50000000',
          name: 'Beauty/Personal Care/Hygiene',
          description: 'Beauty, personal care, and hygiene products'
        }
      }
    }
  },
  '43211501': {
    code: '43211501',
    name: 'Laptop Computers',
    description: 'Portable personal computers',
    class: {
      code: '43211500',
      name: 'Computers',
      description: 'Personal computing devices',
      family: {
        code: '43210000',
        name: 'Computer Equipment and Accessories',
        description: 'Computing hardware and peripherals',
        segment: {
          code: '40000000',
          name: 'Technology/Computers',
          description: 'Technology and computer products'
        }
      }
    }
  },
  '43211502': {
    code: '43211502',
    name: 'Desktop Computers',
    description: 'Stationary personal computers',
    class: {
      code: '43211500',
      name: 'Computers',
      description: 'Personal computing devices',
      family: {
        code: '43210000',
        name: 'Computer Equipment and Accessories',
        description: 'Computing hardware and peripherals',
        segment: {
          code: '40000000',
          name: 'Technology/Computers',
          description: 'Technology and computer products'
        }
      }
    }
  },
  '10000001': {
    code: '10000001',
    name: 'Fresh Vegetables',
    description: 'Fresh vegetable produce',
    class: {
      code: '10000000',
      name: 'Fresh Produce',
      description: 'Fresh fruits and vegetables',
      family: {
        code: '10000000',
        name: 'Food/Beverages',
        description: 'Food and beverage products',
        segment: {
          code: '10000000',
          name: 'Food/Beverage/Tobacco',
          description: 'Food, beverage, and tobacco products'
        }
      }
    }
  }
}

export class GPCParser {
  private data: Record<string, GPCBrick>

  constructor(data?: Record<string, GPCBrick>) {
    this.data = data || GPC_DATA
  }

  /**
   * Get brick by code
   */
  getBrick(code: string): GPCBrick | null {
    return this.data[code] || null
  }

  /**
   * Get classification structure for a brick code
   */
  getClassification(brickCode: string): GPCClassification | null {
    const brick = this.getBrick(brickCode)
    if (!brick) return null

    return {
      segment: brick.class.family.segment.code,
      segmentName: brick.class.family.segment.name,
      family: brick.class.family.code,
      familyName: brick.class.family.name,
      class: brick.class.code,
      className: brick.class.name,
      brick: brick.code,
      brickName: brick.name
    }
  }

  /**
   * Get all bricks in a segment
   */
  getBricksBySegment(segmentCode: string): GPCBrick[] {
    return Object.values(this.data).filter(
      brick => brick.class.family.segment.code === segmentCode
    )
  }

  /**
   * Get all bricks in a family
   */
  getBricksByFamily(familyCode: string): GPCBrick[] {
    return Object.values(this.data).filter(
      brick => brick.class.family.code === familyCode
    )
  }

  /**
   * Get all bricks in a class
   */
  getBricksByClass(classCode: string): GPCBrick[] {
    return Object.values(this.data).filter(
      brick => brick.class.code === classCode
    )
  }

  /**
   * Get all segments
   */
  getAllSegments(): GPCSegment[] {
    const segments = new Map<string, GPCSegment>()

    Object.values(this.data).forEach(brick => {
      const segment = brick.class.family.segment
      if (!segments.has(segment.code)) {
        segments.set(segment.code, segment)
      }
    })

    return Array.from(segments.values())
  }

  /**
   * Get all families
   */
  getAllFamilies(): GPCFamily[] {
    const families = new Map<string, GPCFamily>()

    Object.values(this.data).forEach(brick => {
      const family = brick.class.family
      if (!families.has(family.code)) {
        families.set(family.code, family)
      }
    })

    return Array.from(families.values())
  }

  /**
   * Get all classes
   */
  getAllClasses(): GPCClass[] {
    const classes = new Map<string, GPCClass>()

    Object.values(this.data).forEach(brick => {
      const cls = brick.class
      if (!classes.has(cls.code)) {
        classes.set(cls.code, cls)
      }
    })

    return Array.from(classes.values())
  }

  /**
   * Get all bricks
   */
  getAllBricks(): GPCBrick[] {
    return Object.values(this.data)
  }

  /**
   * Load GPC data from external source
   */
  async loadFromFile(filePath: string): Promise<void> {
    // In production, load from CSV/XML file
    // For now, using sample data
    console.log(`Would load GPC data from: ${filePath}`)
  }

  /**
   * Load GPC data from GS1 API
   */
  async loadFromAPI(): Promise<void> {
    // In production, fetch from GS1 GPC Browser API
    console.log('Would fetch GPC data from GS1 API')
  }
}

// Export singleton instance
export const gpcParser = new GPCParser()
