package repository

import (
	"to-do-list/dto"
	"to-do-list/model"

	"gorm.io/gorm"
)

type TodoItemRepository interface {
	Get(activity_group_id uint) ([]model.TodoItem, error)
	GetById(id uint) (*model.TodoItem, error)
	Create(data *model.TodoItem) error
	Update(id uint, data *dto.ToDoRequest) error
	Delete(id uint) error
}

type todoItemRepository struct {
	db *gorm.DB
}

func NewTodoItemRepository(db *gorm.DB) *todoItemRepository {
	return &todoItemRepository{db}
}

func (t *todoItemRepository) Get(activity_group_id uint) ([]model.TodoItem, error) {
	var items []model.TodoItem

	tx := t.db.Where("activity_group_id = ?", activity_group_id).Order("created_at desc").Find(&items)
	if tx.Error != nil {
		return nil, tx.Error
	}

	return items, nil
}

func (t *todoItemRepository) GetById(id uint) (*model.TodoItem, error) {
	var item model.TodoItem

	tx := t.db.Where("id = ?", id).First(&item)
	if tx.Error != nil {
		return nil, tx.Error
	}

	return &item, nil
}

func (t *todoItemRepository) Create(data *model.TodoItem) error {
	if err := t.db.Create(&data).Error; err != nil {
		return err
	}

	return nil
}

func (t *todoItemRepository) Update(id uint, data *dto.ToDoRequest) error {
	if err := t.db.Model(&model.TodoItem{}).Where("id = ?", id).Updates(&data).Error; err != nil {
		return err
	}

	return nil
}

func (t *todoItemRepository) Delete(id uint) error {
	if err := t.db.Unscoped().Delete(&model.TodoItem{}, id).Error; err != nil {
		return err
	}
	return nil
}