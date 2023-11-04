package model

import "gorm.io/gorm"

type TodoItem struct {
	gorm.Model
	Title           string        `json:"title"`
	IsActive        bool          `json:"is_active"`
	Priority        string        `json:"priority"`
	ActivityGroupID uint          `json:"activity_group_id"`
	ActivityGroup   ActivityGroup `json:"activity_group"`
}
