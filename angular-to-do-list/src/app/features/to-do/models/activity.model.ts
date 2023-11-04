import { environment } from "src/environments/environment";
import { Todo } from "./to-do.model";

export class Activity {
  id?: number;
  title: string | null;
  created_at?: string;
  modified_at?: string;
  todo_items?: Todo[];

  constructor(data: any = {}) {
    if (data.id) {
      this.id = data.id;
      this.created_at = data.created_at;
      this.modified_at = data.modified_at;
      this.todo_items = data.todo_items;
    }
    this.title = data.title || 'New Activity';
  }
}