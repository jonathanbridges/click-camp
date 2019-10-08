json.extract! review, :id, :reviewer_id, :listing_id, :text, :recommends

json.extract! review.user, :id, :username

# Add once photos added for users
# json.photoUrl url_for(review.user.photo)
