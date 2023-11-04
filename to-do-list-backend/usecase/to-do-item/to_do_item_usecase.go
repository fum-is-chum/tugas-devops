package usecase

import (
	"errors"
	"reflect"
	"to-do-list/dto"
	fieldHelper "to-do-list/helpers/field"
	"to-do-list/model"
	repository "to-do-list/repository/to-do-item"

	"github.com/go-playground/validator/v10"
)

var validate = validator.New(validator.WithRequiredStructEnabled())

type TodoItemUseCase interface {
	GetTodos(activity_group_id uint) ([]model.TodoItem, error)
	GetTodoById(id uint) (*model.TodoItem, error)
	CreateTodo(data *dto.ToDoRequest) error
	UpdateTodo(id uint, data *dto.ToDoRequest) error
	DeleteTodo(id uint) error 
}

type todoItemUseCase struct {
	repo repository.TodoItemRepository
}

func NewTodoItemUseCase(repo repository.TodoItemRepository) *todoItemUseCase {
	return &todoItemUseCase{repo}
}

func (t *todoItemUseCase) GetTodos(activity_group_id uint) ([]model.TodoItem, error) {
	todos, err := t.repo.Get(activity_group_id)
	if err != nil {
		return nil, err
	}

	return todos, nil
}

func (t *todoItemUseCase) GetTodoById(id uint) (*model.TodoItem, error) {
	todo, err := t.repo.GetById(id)
	if err != nil {
		return nil, err
	}

	return todo, nil
}

func (t *todoItemUseCase) CreateTodo(data *dto.ToDoRequest) error {
	if err := validate.Struct(data); err != nil {
		return err
	}
	
	todoModel := &model.TodoItem{
		Title: data.Title,
		IsActive: *data.IsActive,
		Priority: data.Priority,
		ActivityGroupID: data.ActivityGroupID,
	}

	if err := t.repo.Create(todoModel); err != nil {
		return err
	}

	return nil
}

func (t *todoItemUseCase) UpdateTodo(id uint, data *dto.ToDoRequest) error {
	val := reflect.ValueOf(*data)

	if fieldHelper.IsFieldSet(&val, "ActivityGroupID") {
		return errors.New("Cannot update ActivityGroupID from this endpoint")
	}

	if err := t.repo.Update(id, data); err != nil {
		return err
	}

	return nil
}

func (t *todoItemUseCase) DeleteTodo(id uint) error {
	if err := t.repo.Delete(id); err != nil {
		return err
	}

	return nil
}