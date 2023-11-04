export enum PRIORITY {
  VERY_HIGH = "very-high",
  HIGH = "high",
  NORMAL = "normal",
  LOW = "low",
  VERY_LOW = "very-low"
}
export class Todo {
  is_active: boolean;
  priority: PRIORITY;
  created_at?: string;
  updated_at?: string;
  id?: number;
  activity_group_id: number;
  title: string;

  constructor(data: any = {}) {
    if (data.id) {
      this.id = data.id;
      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
    }
    this.is_active = data.is_active ?? true;
    this.priority = data.priority || 'very-high';
    this.activity_group_id = data.activity_group_id || null;
    this.title = data.title || null;
  }

  static get requiredFields(): string[] {
    return ['priority', 'activity_group_id', 'title'];
  }

  static get priorities(): string[] {
    return ['very-high', 'high', 'normal', 'low', 'very-low'];
  }

  static get priorityMap(): { [key: string]: string; } {
    return {
      'very-high': 'Very High',
      'high': 'High',
      'normal': 'Medium',
      'low': 'Low',
      'very-low': 'Very Low'
    };
  }
}

