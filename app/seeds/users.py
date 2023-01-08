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
        text = "Khabib got a little pudge to him right now. The lightweight division is stacked at the moment. Will beeb come back and fight if Islam loses his next fight? Despite the pudge... ",
        user_id = 2,
        subreddit_id = 1
    )

    post3 = Post(
        title = "Where does Kevin Lee fit into all this?",
        text = "I was making thanksiving dinner. Turkey? Ready. Mac and cheese? Ready. Mashed potatoes? Ready. Kevin Lee? Nowhere to be found. How does Kevin Lee fit into all this?",
        user_id = 2,
        subreddit_id = 1
    )

    post4 = Post(
        title = "Finally found out why I yawn when my dog yawns",
        text = "Yawning is contagious—even for dogs. Research shows that the sound of a human yawn can trigger one from your dog. And it's four times as likely to happen when it's the yawn of a person he knows.",
        user_id = 1,
        subreddit_id = 2
    )

    post5 = Post(
        title = "Here's why dogs like to curl up in a ball if you're curious",
        text = "Dogs curl up in a ball when sleeping to protect their organs—a hold over from their days in the wild, when they were vulnerable to predator attacks.",
        user_id = 1,
        subreddit_id = 2
    )

    post6 = Post(
        title = "Dogs are the nicest animals!",
        text = "A recent study shows that dogs are among a small group of animals who show voluntary unselfish kindness towards others without any reward. This is one fact dog lovers have known all along.",
        user_id = 3,
        subreddit_id = 2
    )

    post7 = Post(
        title = "Who wants to go to the ramen museum with me?",
        text = "There is a ramen museum in Japan for hardcore ramen lovers. The Shin-Yokohama Ramen Museum is the world's first food-themed amusement park. The park has 9 ramen eateries and ramen-related shops for tourists to enjoy.",
        user_id = 1,
        subreddit_id = 3
    )

    post8 = Post(
        title = "Stop slurping your ramen!",
        text = "Slurping ramen is not a rude notion in Japan. In fact, it's expected. To eat ramen quickly without burning yourself, slurp the noodles to cool them down before swallowing.",
        user_id = 2,
        subreddit_id = 3
    )

    post9 = Post(
        title = "Why wouldn't ramen be considered a luxury item??",
        text = "In 1958, Momofuku Ando invents instant ramen after trial and error and establishes Nissin foods. “Chikin Ramen” became their first flavor. Around this time, ramen was even considered as a luxury item!",
        user_id = 3,
        subreddit_id = 3
    )

    

    db.session.add_all([post1, post2, post3, post4, post5, post6, post7, post8, post9])
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

    comment4 = Comment(
        comment = "RIP 155 if he does",
        user_id = 1,
        post_id = 2
    )

    comment5 = Comment(
        comment = "WHY tho? It was a perfect retirement",
        user_id = 3,
        post_id = 2
    )

    comment6 = Comment(
        comment = "His mom won't be happy",
        user_id = 2,
        post_id = 2
    )

    comment7 = Comment(
        comment = "He sees holes in the Turkey",
        user_id = 1,
        post_id = 3
    )

    comment8 = Comment(
        comment = "Bellator",
        user_id = 2,
        post_id = 3
    )

    comment9 = Comment(
        comment = "Yawned while reading this",
        user_id = 2,
        post_id = 4
    )

    comment10 = Comment(
        comment = "My dog yawned while reading this comment",
        user_id = 3,
        post_id = 4
    )

    comment11 = Comment(
        comment = "Love it when my dog looks like a croissant",
        user_id = 1,
        post_id = 5
    )

    comment12 = Comment(
        comment = "That's fair, I do the same thing",
        user_id = 3,
        post_id = 5
    )

    comment13 = Comment(
        comment = "My dog is not very nice",
        user_id = 1,
        post_id = 6
    )

    comment14 = Comment(
        comment = "Mine is a complete sweetheart",
        user_id = 2,
        post_id = 6
    )

    comment15 = Comment(
        comment = "I will simply eat everything and die of dysentery",
        user_id = 2,
        post_id = 7
    )

    comment16 = Comment(
        comment = "I need to go here YESTERDAY",
        user_id = 3,
        post_id = 7
    )

    comment17 = Comment(
        comment = "I'll slurp all I want",
        user_id = 1,
        post_id = 8
    )

    comment18 = Comment(
        comment = "If you slurp next to me, I'm throwing hands then ladles",
        user_id = 3,
        post_id = 8
    )

    comment19 = Comment(
        comment = "I eat ramen with my pinky out",
        user_id = 2,
        post_id = 9
    )

    comment20 = Comment(
        comment = "My $0.99 ramen says no",
        user_id = 1,
        post_id = 9
    )

    db.session.add_all([comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20 ])
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()