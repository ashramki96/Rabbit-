from app.models import db, User, environment, SCHEMA, Subreddit, Post, Comment


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()

def seed_subreddit():
    mma = Subreddit(
        name = "MMA",
        about = "A community to talk about all things Mixed Martial Arts",
        owner_id = 1
    )

    dog = Subreddit(
        name = "Dogs",
        about = "A community to share your pictures of puppers or all things pupper related",
        owner_id = 2
    )

    ramen = Subreddit(
        name = "Ramen",
        about = "A community to discuss the most wonderful food known to mankind",
        owner_id = 3
    )

    db.session.add_all([mma, dog, ramen])
    db.session.commit()
    

def undo_subreddit():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subreddits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM subreddits")

    db.session.commit()

def seed_posts():
    post1 = Post(
        title = "Will Conor retire?",
        text = "At UFC 264, McGregor lost his second fight in a row against Dustin Poirier. He suffered a broken tibia in the process and underwent surgery to get it fixed. Should he retire?",
        user_id = 3,
        subreddit_id = 1
    )

    post2 = Post(
        title = "Will Khabib come back?",
        text = "Khabib got a little pudge to him right now. Will be come back and fight if Islam loses his next fight? Despite the pudge... ",
        user_id = 2,
        subreddit_id = 1
    )

    post3 = Post(
        title = "Where does Kevin Lee fit into all this?",
        text = "I was making thanksiving dinner. Turkey? Ready. Mac and cheese? Ready. Mashed potatoes? Ready. Kevin Lee? Nowhere to be found. How does Kevin Lee fit into all this?",
        user_id = 2,
        subreddit_id = 1
    )

    db.session.add_all([post1, post2, post3])
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()

def seed_comments():
    comment1 = Comment(
        comment = "I hope so.",
        user_id = 1,
        post_id = 1
    )

    comment2 = Comment(
        comment = "Wait I thought he already retired?",
        user_id = 2,
        post_id = 1
    )

    comment3 = Comment(
        comment = "Conor fans in shambles",
        user_id = 3,
        post_id = 1
    )

    db.session.add_all([comment1, comment2, comment3])
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()