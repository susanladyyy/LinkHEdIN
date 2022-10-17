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
		Theme:      input.Theme,
		Display:    &input.Display,
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

// CreateNotification is the resolver for the createNotification field.
func (r *mutationResolver) CreateNotification(ctx context.Context, input model.NewNotification) (*model.Notification, error) {
	notif := model.Notification{
		Userid: input.Userid,
		Desc:   input.Desc,
		Date:   input.Date,
	}

	_, err := r.DB.Model(&notif).Insert()

	if err != nil {
		return nil, errors.New("insert notif error")
	}

	return &notif, nil
}

// CreateFollower is the resolver for the createFollower field.
func (r *mutationResolver) CreateFollower(ctx context.Context, input model.NewFollower) (*model.Userfollower, error) {
	follower := model.Userfollower{
		Userid:         input.Userid,
		Useridfollower: input.Useridfollower,
	}

	_, err := r.DB.Model(&follower).Insert()

	if err != nil {
		return nil, errors.New("insert follower error")
	}

	return &follower, nil
}

// CreateFollowing is the resolver for the createFollowing field.
func (r *mutationResolver) CreateFollowing(ctx context.Context, input model.NewFollowing) (*model.Userfollowing, error) {
	following := model.Userfollowing{
		Userid:         input.Userid,
		Useridfollowed: input.Useridfollowed,
	}

	_, err := r.DB.Model(&following).Insert()

	if err != nil {
		return nil, errors.New("insert following error")
	}

	return &following, nil
}

// DeleteFollower is the resolver for the deleteFollower field.
func (r *mutationResolver) DeleteFollower(ctx context.Context, input model.NewFollower) (bool, error) {
	var follower model.Userfollower

	_, err2 := r.DB.Model(&follower).Where("userid = ? AND useridfollower = ?", input.Userid, input.Useridfollower).Delete()

	if err2 != nil {
		return false, errors.New("delete follower error")
	}

	return true, nil
}

// DeleteFollowing is the resolver for the deleteFollowing field.
func (r *mutationResolver) DeleteFollowing(ctx context.Context, input model.NewFollowing) (bool, error) {
	var following model.Userfollowing

	_, err2 := r.DB.Model(&following).Where("userid = ? AND useridfollowed = ?", input.Userid, input.Useridfollowed).Delete()

	if err2 != nil {
		return false, errors.New("delete following error")
	}

	return true, nil
}

// CreateView is the resolver for the createView field.
func (r *mutationResolver) CreateView(ctx context.Context, input model.NewView) (*model.Profileview, error) {
	view := model.Profileview{
		Useridviewed: input.Useridviewed,
	}

	_, err := r.DB.Model(&view).Insert()

	if err != nil {
		return nil, errors.New("insert view failed")
	}

	return &view, nil
}

// DeleteView is the resolver for the deleteView field.
func (r *mutationResolver) DeleteView(ctx context.Context, status bool) (bool, error) {
	var view model.Profileview

	_, err := r.DB.Model(&view).Where("deletestatus = ?", status).Delete()

	if err != nil {
		return false, errors.New("delete views failed")
	}

	return true, nil
}

// CreateEducation is the resolver for the createEducation field.
func (r *mutationResolver) CreateEducation(ctx context.Context, input model.NewEducation) (*model.Education, error) {
	education := model.Education{
		Grade:        input.Grade,
		Activities:   input.Activities,
		Description:  input.Description,
		Schoolname:   input.Schoolname,
		Degreeid:     input.Degreeid,
		Fieldofstudy: input.Fieldofstudy,
		Startdate:    input.Startdate,
		Enddate:      input.Enddate,
		Userid:       input.Userid,
	}

	_, err := r.DB.Model(&education).Insert()

	if err != nil {
		return nil, errors.New("insert education failed")
	}

	return &education, nil
}

// CreateExperience is the resolver for the createExperience field.
func (r *mutationResolver) CreateExperience(ctx context.Context, input model.NewExperience) (*model.Experience, error) {
	experience := model.Experience{
		Userid:          input.Userid,
		Title:           input.Title,
		Employmentypeid: input.Employmentypeid,
		Companyname:     input.Companyname,
		Location:        input.Location,
		Startdate:       input.Startdate,
		Enddate:         input.Enddate,
		Description:     input.Description,
		Industry:        input.Industry,
	}

	_, err := r.DB.Model(&experience).Insert()

	if err != nil {
		return nil, errors.New("insert experience failed")
	}

	return &experience, nil
}

// UpdateProfile is the resolver for the updateProfile field.
func (r *mutationResolver) UpdateProfile(ctx context.Context, input model.EditProfile) (*model.User, error) {
	var upd model.User

	upd.Firstname = input.Firstname
	upd.Lastname = input.Lastname
	upd.Headline = *input.Headline
	upd.About = *input.About
	upd.Banner = input.Banner
	upd.Profile = input.Profile

	_, err2 := r.DB.Model(&upd).Where("id = ?", input.ID).UpdateNotNull()

	if err2 != nil {
		return nil, errors.New("update profile error")
	}

	return &upd, nil
}

// DeleteEducation is the resolver for the deleteEducation field.
func (r *mutationResolver) DeleteEducation(ctx context.Context, id string) (bool, error) {
	var edu model.Education

	_, err := r.DB.Model(&edu).Where("id = ?", id).Delete()

	if err != nil {
		return false, errors.New("delete education failed")
	}

	return true, nil
}

// DeleteExperience is the resolver for the deleteExperience field.
func (r *mutationResolver) DeleteExperience(ctx context.Context, id string) (bool, error) {
	var exp model.Experience

	_, err := r.DB.Model(&exp).Where("id = ?", id).Delete()

	if err != nil {
		return false, errors.New("delete experience failed")
	}

	return true, nil
}

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input model.NewPost) (*model.Post, error) {
	post := model.Post{
		Userid:  input.Userid,
		Media:   input.Media,
		Caption: input.Caption,
		Display: &input.Display,
	}

	_, err := r.DB.Model(&post).Insert()

	if err != nil {
		return nil, errors.New("create post failed")
	}

	return &post, nil
}

// CreateComment is the resolver for the createComment field.
func (r *mutationResolver) CreateComment(ctx context.Context, input *model.NewComment) (*model.Comment, error) {
	comment := model.Comment{
		Userid:  input.Userid,
		Postid:  input.Postid,
		Comment: *input.Comment,
	}

	_, err := r.DB.Model(&comment).Insert()

	if err != nil {
		return nil, errors.New("create comment failed")
	}

	return &comment, nil
}

// CreateLike is the resolver for the createLike field.
func (r *mutationResolver) CreateLike(ctx context.Context, input *model.NewLike) (*model.Like, error) {
	like := model.Like{
		Userid: input.Userid,
		Postid: input.Postid,
	}

	_, err := r.DB.Model(&like).Insert()

	if err != nil {
		return nil, errors.New("create like failed")
	}

	return &like, nil
}

// DeleteLike is the resolver for the deleteLike field.
func (r *mutationResolver) DeleteLike(ctx context.Context, id string, userid string) (bool, error) {
	var like model.Like

	_, err := r.DB.Model(&like).Where("userid = ? and postid = ?", userid, id).Delete()

	if err != nil {
		return false, errors.New("delete like failed")
	}

	return true, nil
}

// DeleteComment is the resolver for the deleteComment field.
func (r *mutationResolver) DeleteComment(ctx context.Context, id string) (bool, error) {
	var comment model.Comment

	_, err := r.DB.Model(&comment).Where("id = ?", id).Delete()

	if err != nil {
		return false, errors.New("delete comment failed")
	}

	return true, nil
}

// CreateCommentLike is the resolver for the createCommentLike field.
func (r *mutationResolver) CreateCommentLike(ctx context.Context, input model.NewCommentLike) (*model.Commentlike, error) {
	com := model.Commentlike{
		Commentid: input.Commentid,
		Userid:    input.Userid,
	}

	_, err := r.DB.Model(&com).Insert()

	if err != nil {
		return nil, errors.New("insert comment likes failed")
	}

	return &com, nil
}

// DeleteCommentLike is the resolver for the deleteCommentLike field.
func (r *mutationResolver) DeleteCommentLike(ctx context.Context, commentid float64, userid float64) (bool, error) {
	var com model.Commentlike

	_, err := r.DB.Model(&com).Where("commentid = ? and userid = ?", commentid, userid).Delete()

	if err != nil {
		return false, errors.New("delete comment likes failed")
	}

	return true, nil
}

// CreateBlock is the resolver for the createBlock field.
func (r *mutationResolver) CreateBlock(ctx context.Context, input model.NewUserBlock) (*model.Userblock, error) {
	block := model.Userblock{
		Userid:        input.Userid,
		Useridblocked: input.Useridblocked,
	}

	_, err := r.DB.Model(&block).Insert()

	if err != nil {
		return nil, errors.New("insert block failed")
	}

	return &block, nil
}

// DeleteBlock is the resolver for the deleteBlock field.
func (r *mutationResolver) DeleteBlock(ctx context.Context, input model.NewUserBlock) (bool, error) {
	var block model.Userblock

	_, err := r.DB.Model(&block).Where("userid = ? and useridblocked = ?", input.Userid, input.Useridblocked).Delete()

	if err != nil {
		return false, errors.New("delete block failed")
	}

	return true, nil
}

// CreateCommentReply is the resolver for the createCommentReply field.
func (r *mutationResolver) CreateCommentReply(ctx context.Context, input model.NewCommentReply) (*model.Commentreply, error) {
	reply := model.Commentreply{
		Commentid:    input.Commentid,
		Userid:       input.Userid,
		Commentreply: input.Commentreply,
	}

	_, err := r.DB.Model(&reply).Insert()

	if err != nil {
		return nil, errors.New("insert reply failed")
	}

	return &reply, nil
}

// DeleteCommentReply is the resolver for the deleteCommentReply field.
func (r *mutationResolver) DeleteCommentReply(ctx context.Context, id string) (bool, error) {
	var reply model.Commentreply

	_, err := r.DB.Model(&reply).Where("id = ?", id).Delete()

	if err != nil {
		return false, errors.New("delete reply failed")
	}

	return true, nil
}

// CreateCommentReplyLike is the resolver for the createCommentReplyLike field.
func (r *mutationResolver) CreateCommentReplyLike(ctx context.Context, input *model.NewCommentReplyLike) (*model.Commentreplylike, error) {
	replyLike := model.Commentreplylike{
		Userid:         input.Userid,
		Commentreplyid: input.Commentreplyid,
	}

	_, err := r.DB.Model(&replyLike).Insert()

	if err != nil {
		return nil, errors.New("insert reply like failed")
	}

	return &replyLike, nil
}

// DeleteCommentReplyLike is the resolver for the deleteCommentReplyLike field.
func (r *mutationResolver) DeleteCommentReplyLike(ctx context.Context, userid float64, commentreplyid float64) (bool, error) {
	var replyLike model.Commentreplylike

	_, err := r.DB.Model(&replyLike).Where("userid = ? and commentreplyid = ?", userid, commentreplyid).Delete()

	if err != nil {
		return false, errors.New("delete reply like failed")
	}

	return true, nil
}

// UpdateTheme is the resolver for the updateTheme field.
func (r *mutationResolver) UpdateTheme(ctx context.Context, input model.UpdateTheme) (*model.User, error) {
	var user model.User

	user.Theme = input.Theme

	_, err2 := r.DB.Model(&user).Where("id = ?", input.ID).UpdateNotNull()

	if err2 != nil {
		return nil, errors.New("update theme error")
	}

	return &user, nil
}

// CreateUserMessage is the resolver for the createUserMessage field.
func (r *mutationResolver) CreateUserMessage(ctx context.Context, input model.NewUserMessage) (*model.Message, error) {
	message := model.Message{
		Useridsend:    input.Useridsend,
		Useridreceive: input.Useridreceive,
	}

	_, err := r.DB.Model(&message).Insert()

	if err != nil {
		return nil, errors.New("insert message failed")
	}

	return &message, nil
}

// CreateUserMessageBubble is the resolver for the createUserMessageBubble field.
func (r *mutationResolver) CreateUserMessageBubble(ctx context.Context, input *model.NewUserMessageBubble) (*model.Usermessage, error) {
	message := model.Usermessage{
		Useridsend:    input.Useridsend,
		Useridreceive: input.Useridreceive,
		Message:       input.Message,
	}

	_, err := r.DB.Model(&message).Insert()

	if err != nil {
		return nil, errors.New("insert message failed")
	}

	return &message, nil
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

// Userconnections is the resolver for the userconnections field.
func (r *queryResolver) Userconnections(ctx context.Context, id float64, status *bool) ([]*model.Userconnection, error) {
	var usercons []*model.Userconnection

	err := r.DB.Model(&usercons).Where("userid = ? and status = ?", id, status).Select()

	if err != nil {
		return nil, errors.New("select cons failed")
	}

	return usercons, nil
}

// Userinvitations is the resolver for the userinvitations field.
func (r *queryResolver) Userinvitations(ctx context.Context, id float64, status *bool) ([]*model.Userconnection, error) {
	var userinvs []*model.Userconnection

	err := r.DB.Model(&userinvs).Where("useridconnect = ? and status = ?", id, status).Select()

	if err != nil {
		return nil, errors.New("select invs failed")
	}

	return userinvs, nil
}

// Userfollowing is the resolver for the userfollowing field.
func (r *queryResolver) Userfollowing(ctx context.Context, id float64) ([]*model.Userfollowing, error) {
	var userfol []*model.Userfollowing

	err := r.DB.Model(&userfol).Where("userid = ?", id).Select()

	if err != nil {
		return nil, errors.New("select following failed")
	}

	return userfol, nil
}

// Userfollower is the resolver for the userfollower field.
func (r *queryResolver) Userfollower(ctx context.Context, id float64) ([]*model.Userfollower, error) {
	var userfol []*model.Userfollower

	err := r.DB.Model(&userfol).Where("userid = ?", id).Select()

	if err != nil {
		return nil, errors.New("select follower failed")
	}

	return userfol, nil
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

// Notifications is the resolver for the notifications field.
func (r *queryResolver) Notifications(ctx context.Context) ([]*model.Notification, error) {
	var notifs []*model.Notification

	err := r.DB.Model(&notifs).Select()

	if err != nil {
		return nil, errors.New("select notifications failed")
	}

	return notifs, nil
}

// Profileviews is the resolver for the profileviews field.
func (r *queryResolver) Profileviews(ctx context.Context, id float64) ([]*model.Profileview, error) {
	var views []*model.Profileview

	err := r.DB.Model(&views).Where("useridviewed = ?", id).Select()

	if err != nil {
		return nil, errors.New("select views failed")
	}

	return views, nil
}

// Educations is the resolver for the educations field.
func (r *queryResolver) Educations(ctx context.Context, id float64) ([]*model.Education, error) {
	var edus []*model.Education

	err := r.DB.Model(&edus).Where("userid = ?", id).Select()

	if err != nil {
		return nil, errors.New("select edus failed")
	}

	return edus, nil
}

// Experiences is the resolver for the experiences field.
func (r *queryResolver) Experiences(ctx context.Context, id float64) ([]*model.Experience, error) {
	var exps []*model.Experience

	err := r.DB.Model(&exps).Where("userid = ?", id).Select()

	if err != nil {
		return nil, errors.New("select exps failed")
	}

	return exps, nil
}

// Posts is the resolver for the posts field.
func (r *queryResolver) Posts(ctx context.Context, title *string) ([]*model.Post, error) {
	var posts []*model.Post
	var err error

	if title != nil {
		err = r.DB.Model(&posts).Where("caption LIKE ?", title).Select()
	} else {
		err = r.DB.Model(&posts).Select()
	}

	if err != nil {
		return nil, errors.New("select posts failed")
	}

	return posts, nil
}

// Comments is the resolver for the comments field.
func (r *queryResolver) Comments(ctx context.Context) ([]*model.Comment, error) {
	var comments []*model.Comment

	err := r.DB.Model(&comments).Select()
	// if offset != nil && limit != nil {
	// 	err = r.DB.Model(&comments).Offset(offset).Limit(limit).Select()
	// } else {
	// 	err = r.DB.Model(&comments).Select()
	// }

	if err != nil {
		return nil, errors.New("select comments failed")
	}

	return comments, nil
}

// Likes is the resolver for the likes field.
func (r *queryResolver) Likes(ctx context.Context) ([]*model.Like, error) {
	var likes []*model.Like

	err := r.DB.Model(&likes).Select()

	if err != nil {
		return nil, errors.New("select likes failed")
	}

	return likes, nil
}

// Commentlikes is the resolver for the commentlikes field.
func (r *queryResolver) Commentlikes(ctx context.Context) ([]*model.Commentlike, error) {
	var comlikes []*model.Commentlike

	err := r.DB.Model(&comlikes).Select()

	if err != nil {
		return nil, errors.New("select comment likes failed")
	}

	return comlikes, nil
}

// Userblocks is the resolver for the userblocks field.
func (r *queryResolver) Userblocks(ctx context.Context, id *float64, blocked *float64) ([]*model.Userblock, error) {
	var blocks []*model.Userblock
	var err error

	if id != nil && blocked != nil {
		err = r.DB.Model(&blocks).Where("userid = ? AND useridblocked = ?", id, blocked).Select()
	} else if id != nil {
		err = r.DB.Model(&blocks).Where("userid = ?", id).Select()
	} else if blocked != nil {
		err = r.DB.Model(&blocks).Where("useridblocked = ?", blocked).Select()
	} else {
		err = r.DB.Model(&blocks).Select()
	}

	if err != nil {
		return nil, errors.New("select blocks failed")
	}

	return blocks, nil
}

// Commentreplies is the resolver for the commentreplies field.
func (r *queryResolver) Commentreplies(ctx context.Context) ([]*model.Commentreply, error) {
	var replies []*model.Commentreply

	err := r.DB.Model(&replies).Select()

	if err != nil {
		return nil, errors.New("select replies failed")
	}

	return replies, nil
}

// Commentreplylikes is the resolver for the commentreplylikes field.
func (r *queryResolver) Commentreplylikes(ctx context.Context) ([]*model.Commentreplylike, error) {
	var replyLikes []*model.Commentreplylike

	err := r.DB.Model(&replyLikes).Select()

	if err != nil {
		return nil, errors.New("select reply likes failed")
	}

	return replyLikes, nil
}

// Messages is the resolver for the messages field.
func (r *queryResolver) Messages(ctx context.Context) ([]*model.Message, error) {
	var messages []*model.Message

	err := r.DB.Model(&messages).Select()

	if err != nil {
		return nil, errors.New("select messages failed")
	}

	return messages, nil
}

// Usermessages is the resolver for the usermessages field.
func (r *queryResolver) Usermessages(ctx context.Context) ([]*model.Usermessage, error) {
	var messages []*model.Usermessage

	err := r.DB.Model(&messages).Select()

	if err != nil {
		return nil, errors.New("select user messages failed")
	}

	return messages, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
