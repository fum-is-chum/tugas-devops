package model

import "gorm.io/gorm"

type ActivityGroup struct {
	gorm.Model
	Title     string     `json:"title"`
	TodoItems []TodoItem `json:"todo_items" gorm:"foreignkey:ActivityGroupID;constraint:OnDelete:CASCADE;"`
}
