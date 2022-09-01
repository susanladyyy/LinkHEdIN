package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"

	"github.com/susanladyyy/LinkHEdIN/graph/generated"
	"github.com/susanladyyy/LinkHEdIN/graph/model"
)

// UpdatePassword is the resolver for the updatePassword field.
func (r *mutationResolver) UpdatePassword(ctx context.Context, input model.NewPass) (*model.User, error) {
	var user model.User

	user.Password = input.Password

	_, err2 := r.DB.Model(&user).Where("id = ?", input.ID).UpdateNotNull()

	if err2 != nil {
		return nil, errors.New("update user error")
	}

	return &user, nil
}

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	user := model.User{
		Firstname:  input.Firstname,
		Lastname:   input.Lastname,
		Password:   input.Password,
		Profileurl: input.Profileurl,
		Email:      input.Email,
		Activation: input.Activation,
	}

	_, err := r.DB.Model(&user).Insert()

	if err != nil {
		return nil, errors.New("insert new user error" + err.Error())
	}

	return &user, nil
}

// CreateTemporary is the resolver for the createTemporary field.
func (r *mutationResolver) CreateTemporary(ctx context.Context, input model.NewTemporary) (*model.Temporary, error) {
	temp := model.Temporary{
		Email:    input.Email,
		Password: input.Password,
		URL:      input.URL,
	}

	_, err := r.DB.Model(&temp).Insert()

	if err != nil {
		return nil, errors.New("insert new user error" + err.Error())
	}

	return &temp, nil
}

// DeleteTemporary is the resolver for the deleteTemporary field.
func (r *mutationResolver) DeleteTemporary(ctx context.Context, input model.DeleteTemporary) (bool, error) {
	var temp model.Temporary

	err := r.DB.Model(&temp).Where("url = ?", input.URL).First()

	if err != nil {
		return false, errors.New("url not found")
	}

	_, err2 := r.DB.Model(&temp).Where("url = ?", input.URL).Delete()

	if err2 != nil {
		return false, errors.New("delete temp error")
	}

	return true, nil
}

// CreateJob is the resolver for the createJob field.
func (r *mutationResolver) CreateJob(ctx context.Context, input model.NewJob) (*model.Job, error) {
	job := model.Job{
		Name:     input.Name,
		Company:  input.Company,
		Location: input.Location,
		Userid:   input.Userid,
	}

	_, err := r.DB.Model(&job).Insert()

	if err != nil {
		return nil, errors.New("insert new job error" + err.Error())
	}

	return &job, nil
}

// UpdateConnect is the resolver for the updateConnect field.
func (r *mutationResolver) UpdateConnect(ctx context.Context, input model.UpdateConnect) (*model.Userconnection, error) {
	var usercon model.Userconnection

	usercon.Status = input.Status

	_, err2 := r.DB.Model(&usercon).Where("userid = ? AND useridconnect = ?", input.Userid, input.Useridconnect).UpdateNotNull()

	if err2 != nil {
		return nil, errors.New("update usercon error")
	}

	return &usercon, nil
}

// CreateConnect is the resolver for the createConnect field.
func (r *mutationResolver) CreateConnect(ctx context.Context, input model.NewConnect) (*model.Userconnection, error) {
	usercon := model.Userconnection{
		Userid:        input.Userid,
		Useridconnect: input.Useridconnect,
		Status:        input.Status,
	}

	_, err := r.DB.Model(&usercon).Insert()

	if err != nil {
		return nil, errors.New("insert usercon error")
	}

	return &usercon, nil
}

// DeleteConnect is the resolver for the deleteConnect field.
func (r *mutationResolver) DeleteConnect(ctx context.Context, input model.DelConnect) (bool, error) {
	var usercon model.Userconnection

	_, err2 := r.DB.Model(&usercon).Where("userid = ? AND useridconnect = ?", input.Userid, input.Useridconnect).Delete()

	if err2 != nil {
		return false, errors.New("delete usercon error")
	}

	return true, nil
}

// Countries is the resolver for the countries field.
func (r *queryResolver) Countries(ctx context.Context) ([]*model.Country, error) {
	var countries []*model.Country

	err := r.DB.Model(&countries).Select()

	if err != nil {
		return nil, errors.New("select countries failed")
	}

	return countries, nil
}

// Cities is the resolver for the cities field.
func (r *queryResolver) Cities(ctx context.Context) ([]*model.City, error) {
	var cities []*model.City

	err := r.DB.Model(&cities).Select()

	if err != nil {
		return nil, errors.New("select cities failed")
	}

	return cities, nil
}

// Pronouns is the resolver for the pronouns field.
func (r *queryResolver) Pronouns(ctx context.Context) ([]*model.Pronoun, error) {
	var pronouns []*model.Pronoun

	err := r.DB.Model(&pronouns).Select()

	if err != nil {
		return nil, errors.New("select pronouns failed")
	}

	return pronouns, nil
}

// Industries is the resolver for the industries field.
func (r *queryResolver) Industries(ctx context.Context) ([]*model.Industry, error) {
	var industries []*model.Industry

	err := r.DB.Model(&industries).Select()

	if err != nil {
		return nil, errors.New("select industries failed")
	}

	return industries, nil
}

// Employmenttypes is the resolver for the employmenttypes field.
func (r *queryResolver) Employmenttypes(ctx context.Context) ([]*model.Employmenttype, error) {
	var employmenttypes []*model.Employmenttype

	err := r.DB.Model(&employmenttypes).Select()

	if err != nil {
		return nil, errors.New("select employment types failed")
	}

	return employmenttypes, nil
}

// Degrees is the resolver for the degrees field.
func (r *queryResolver) Degrees(ctx context.Context) ([]*model.Degree, error) {
	var degrees []*model.Degree

	err := r.DB.Model(&degrees).Select()

	if err != nil {
		return nil, errors.New("select degrees failed")
	}

	return degrees, nil
}

// Schools is the resolver for the schools field.
func (r *queryResolver) Schools(ctx context.Context) ([]*model.School, error) {
	var schools []*model.School

	err := r.DB.Model(&schools).Select()

	if err != nil {
		return nil, errors.New("select schools failed")
	}

	return schools, nil
}

// Studyfields is the resolver for the studyfields field.
func (r *queryResolver) Studyfields(ctx context.Context) ([]*model.Studyfield, error) {
	var studyfields []*model.Studyfield

	err := r.DB.Model(&studyfields).Select()

	if err != nil {
		return nil, errors.New("select study fields failed")
	}

	return studyfields, nil
}

// Phonetypes is the resolver for the phonetypes field.
func (r *queryResolver) Phonetypes(ctx context.Context) ([]*model.Phonetype, error) {
	var phonetypes []*model.Phonetype

	err := r.DB.Model(&phonetypes).Select()

	if err != nil {
		return nil, errors.New("select phone types failed")
	}

	return phonetypes, nil
}

// Websitetypes is the resolver for the websitetypes field.
func (r *queryResolver) Websitetypes(ctx context.Context) ([]*model.Websitetype, error) {
	var websitetypes []*model.Websitetype

	err := r.DB.Model(&websitetypes).Select()

	if err != nil {
		return nil, errors.New("select website types failed")
	}

	return websitetypes, nil
}

// Servicetypes is the resolver for the servicetypes field.
func (r *queryResolver) Servicetypes(ctx context.Context) ([]*model.Servicetype, error) {
	var servicetypes []*model.Servicetype

	err := r.DB.Model(&servicetypes).Select()

	if err != nil {
		return nil, errors.New("select service types failed")
	}

	return servicetypes, nil
}

// Mediatypes is the resolver for the mediatypes field.
func (r *queryResolver) Mediatypes(ctx context.Context) ([]*model.Mediatype, error) {
	var mediatypes []*model.Mediatype

	err := r.DB.Model(&mediatypes).Select()

	if err != nil {
		return nil, errors.New("select media types failed")
	}

	return mediatypes, nil
}

// Skills is the resolver for the skills field.
func (r *queryResolver) Skills(ctx context.Context) ([]*model.Skill, error) {
	var skills []*model.Skill

	err := r.DB.Model(&skills).Select()

	if err != nil {
		return nil, errors.New("select skill failed")
	}

	return skills, nil
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context, email *string, password *string, url *string, name *string) ([]*model.User, error) {
	var users []*model.User
	var err error

	if email != nil && password != nil {
		err = r.DB.Model(&users).Where("email = ? and password = ?", email, password).Select()
	} else if email != nil && password == nil {
		err = r.DB.Model(&users).Where("email = ?", email).Select()
	} else if url != nil {
		err = r.DB.Model(&users).Where("profileurl = ?", url).Select()
	} else if name != nil {
		err = r.DB.Model(&users).Where("firstname LIKE ? OR lastname LIKE ?", name, name).Select()
	} else {
		err = r.DB.Model(&users).Select()
	}

	if err != nil {
		return nil, errors.New("select users failed")
	}

	return users, nil
}

// Temporaries is the resolver for the temporaries field.
func (r *queryResolver) Temporaries(ctx context.Context, url *string) ([]*model.Temporary, error) {
	var temps []*model.Temporary
	var err error

	if url != nil {
		err = r.DB.Model(&temps).Where("url = ?", url).Select()
	} else {
		err = r.DB.Model(&temps).Select()
	}

	if err != nil {
		return nil, errors.New("select temps failed")
	}

	return temps, nil
}

// Usereducations is the resolver for the usereducations field.
func (r *queryResolver) Usereducations(ctx context.Context, id string) ([]*model.Usereducation, error) {
	var useredus []*model.Usereducation

	err := r.DB.Model(&useredus).Where("userid = ?", id).Select()

	if err != nil {
		return nil, errors.New("select edus failed")
	}

	return useredus, nil
}

// Userconnections is the resolver for the userconnections field.
func (r *queryResolver) Userconnections(ctx context.Context, id string, status *bool) ([]*model.Userconnection, error) {
	var usercons []*model.Userconnection

	err := r.DB.Model(&usercons).Where("userid = ? and status = ?", id, status).Select()

	if err != nil {
		return nil, errors.New("select cons failed")
	}

	return usercons, nil
}

// Jobs is the resolver for the jobs field.
func (r *queryResolver) Jobs(ctx context.Context, userid *string) ([]*model.Job, error) {
	var jobs []*model.Job
	var err error

	if userid != nil {
		err = r.DB.Model(&jobs).Where("userid = ?", userid).Select()
	} else {
		err = r.DB.Model(&jobs).Select()
	}

	if err != nil {
		return nil, errors.New("select jobs failed")
	}

	return jobs, nil
}

// Educations is the resolver for the educations field.
func (r *queryResolver) Educations(ctx context.Context) ([]*model.Education, error) {
	var edus []*model.Education

	err := r.DB.Model(&edus).Select()

	if err != nil {
		return nil, errors.New("select edus failed")
	}

	return edus, nil
}

// Experiences is the resolver for the experiences field.
func (r *queryResolver) Experiences(ctx context.Context) ([]*model.Experience, error) {
	var exps []*model.Experience

	err := r.DB.Model(&exps).Select()

	if err != nil {
		return nil, errors.New("select exps failed")
	}

	return exps, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
