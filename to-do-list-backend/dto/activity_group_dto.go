package dto

import "time"

type ActivityGroupRequest struct {
	Title string `json:"title" validate:"required"`
}

type ActivityGroupResponse struct {
	Id         uint           `json:"id"`
	Title      string         `json:"title"`
	TodoItems  []ToDoResponse `json:"todo_items"`
	CreatedAt  time.Time      `json:"created_at"`
	ModifiedAt time.Time      `json:"modified_at"`
}
