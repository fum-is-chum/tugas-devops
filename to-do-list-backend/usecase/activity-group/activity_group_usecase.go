package usecase

import (
	"errors"
	"reflect"
	"to-do-list/dto"
	"to-do-list/model"
	repository "to-do-list/repository/activity-group"

	"github.com/go-playground/validator/v10"
)

var validate = validator.New(validator.WithRequiredStructEnabled())

type ActivityGroupUseCase interface {
	GetActivities() ([]model.ActivityGroup, error)
	GetActivityById(id uint) (*model.ActivityGroup, error)
	CreateActivity(data *dto.ActivityGroupRequest) error
	UpdateActivity(id uint, data *dto.ActivityGroupRequest) error
	DeleteActivity(id uint) error
}

type activityGroupUseCase struct {
	repo repository.ActivityGroupRepository
}

func NewActivityGroupUseCase(repo repository.ActivityGroupRepository) *activityGroupUseCase {
	return &activityGroupUseCase{repo}
}

func (a *activityGroupUseCase) GetActivities() ([]model.ActivityGroup, error) {
	groups, err := a.repo.Get()
	if err != nil {
		return nil, err
	}

	return groups, nil
}

func (a *activityGroupUseCase) GetActivityById(id uint) (*model.ActivityGroup, error) {
	group, err := a.repo.GetById(id)
	if err != nil {
		return nil, err
	}

	return group, nil
}


func (a *activityGroupUseCase) CreateActivity(data *dto.ActivityGroupRequest) error {
	if err := validate.Struct(data); err != nil {
		return err
	}
	
	activityGroupModel := &model.ActivityGroup{
		Title: data.Title,
	}

	if err := a.repo.Create(activityGroupModel); err != nil {
		return err
	}

	return nil
}

func (a *activityGroupUseCase) UpdateActivity(id uint, data *dto.ActivityGroupRequest) error {
	updates := make(map[string]interface{})

	structValue := reflect.ValueOf(*data)
	for i:=0; i < structValue.NumField(); i++ {
		key := structValue.Type().Field(i).Name
		value := structValue.Field(i).Interface()
		
		if value != reflect.Zero(structValue.Type().Field(i).Type).Interface() {
			updates[key] = value
		}
	}

	if len(updates) == 0 {
		return errors.New("No fields to update or fields value is empty!")
	}

	if err := a.repo.Update(id, &updates); err != nil {
		return err
	}

	return nil
}


func (a *activityGroupUseCase) DeleteActivity(id uint) error {
	if err := a.repo.Delete(id); err != nil {
		return err
	}

	return nil
}