# user = User.find(review.reviewer_id)

# json.extract! review, :id, :reviewer_id, :listing_id, :text, :recommends
# json.extract! user, :id, :username
# json.photoUrl url_for(user.photo) if user.photo.attached?

user = User.find(review.reviewer_id)
json.extract! review, :id, :reviewer_id, :listing_id, :text, :recommends
json.extract! user, :username
json.photoUrl url_for(user.photo) if user.photo.attached?
