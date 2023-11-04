package dto

import (
	"time"
)

type ToDoRequest struct {
	Title           string `json:"title,omitempty" validate:"required"`
	IsActive        *bool  `json:"is_active,omitempty" validate:"required"`
	Priority        string `json:"priority,omitempty" validate:"required"`
	ActivityGroupID uint   `json:"activity_group_id,omitempty" validate:"required"`
}

type ToDoResponse struct {
	Id              uint      `json:"id"`
	Title           string    `json:"title"`
	IsActive        bool      `json:"is_active"`
	ActivityGroupID uint      `json:"activity_group_id"`
	Priority        string    `json:"priority"`
	CreatedAt       time.Time `json:"created_at"`
	ModifiedAt      time.Time `json:"modified_at"`
}
