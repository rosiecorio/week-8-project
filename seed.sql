CREATE TABLE IF NOT EXISTS posts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(90),
  content TEXT,
  img_url TEXT
)

CREATE TABLE IF NOT EXISTS comments (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(60),
  comment TEXT,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE
)

INSERT INTO posts (title, content, img_url) VALUES 
('Will we get a third book?', 'Patrick Rothfuss has kept us on our toes for many years, have we all lost faith or will we some day get to read Doors of Stone?', 'https://ih1.redbubble.net/image.2497315377.2956/flat,750x1000,075,t.u1.jpg'),
('Controversial Opinion', 'The harry potter books are overrated. I preferred the movies.', 'https://images.squarespace-cdn.com/content/v1/5c71c7d8aadd342945360ba1/1586723509001-E5NQB7VLS1R9NS0EOSOM/Harry+Potter+and+the+Philosopher%27s+Stone+Original+Children%27s+Edition+Cover.jpg'),
('I have never read a book!', 'Please suggest some books for me to read!', 'https://m.media-amazon.com/images/I/61MFSuAs-9L._AC_UF894,1000_QL80_.jpg')

INSERT INTO comments (name, comment, post_id) VALUES 
('Rosie', 'I will never give up hope!', 1),
('Sam', 'This is pure blasphemy! You should be banished.', 2),
('Taylor', 'Books are lame! You dont need them. I will never read a book!', 3),
('Dillan', 'You should check out the Golden Compass book, would highly recommend.', 3)

INSERT INTO comments (name, comment, post_id) VALUES 
('Sam', 'This is pure blasphemy! You should be banished.', 2)