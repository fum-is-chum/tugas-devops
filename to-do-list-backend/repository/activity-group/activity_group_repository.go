package repository

import (
	"to-do-list/model"

	"gorm.io/gorm"
)

type ActivityGroupRepository interface {
	Get() ([]model.ActivityGroup, error)
	GetById(id uint) (*model.ActivityGroup, error)
	Create(data *model.ActivityGroup) error
	Update(id uint, data *map[string]interface{}) error
	Delete(id uint) error
}

type activityGroupRepository struct {
	db *gorm.DB
}

func NewActivityGroupRepository(db *gorm.DB) *activityGroupRepository {
	return &activityGroupRepository{db}
}

func (a *activityGroupRepository) Get() ([]model.ActivityGroup, error) {
	var groups []model.ActivityGroup

	tx := a.db.Order("created_at desc").Find(&groups)
	if tx.Error != nil {
		return nil, tx.Error
	}

	return groups, nil
}

func (a *activityGroupRepository) GetById(id uint) (*model.ActivityGroup, error) {
	var group model.ActivityGroup

	tx := a.db.Where("id = ?", id).Preload("TodoItems").First(&group)
	if tx.Error != nil {
		return nil, tx.Error
	}

	return &group, nil
}

func (a *activityGroupRepository) Create(data *model.ActivityGroup) error {
	if err := a.db.Create(&data).Error; err != nil {
		return err
	}

	return nil
}

func (a *activityGroupRepository) Update(id uint, data *map[string]interface{}) error {
	if err := a.db.Model(&model.ActivityGroup{}).Where("id = ?", id).Updates(&data).Error; err != nil {
		return err
	}

	return nil
}

func (a *activityGroupRepository) Delete(id uint) error {
	if err := a.db.Unscoped().Delete(&model.ActivityGroup{}, id).Error; err != nil {
		return err
	}

	return nil
}