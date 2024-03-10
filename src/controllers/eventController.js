const authorize = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
  app.get('/events', authorize, (req, res) => {
    res.json(events.filter(event => req.user.role === 'organizer' || event.participants.includes(req.user.username)));
  });
  
  app.post('/events', authorize, (req, res) => {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ message: 'Unauthorized to create events' });
    }
    const newEvent = { ...req.body, id: generateEventId(), participants: [] };
    events.push(newEvent);
    res.json({ message: 'Event created successfully' });
  });
  
  app.put('/events/:id', authorize, (req, res) => {
    const eventId = req.params.id;
    const eventIndex = events.findIndex(event => event.id === eventId);
    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (events[eventIndex].participants.indexOf(req.user.username) === -1) {
      return res.status(403).json({ message: 'Unauthorized to update event' });
    }
    events[eventIndex] = { ...events[eventIndex], ...req.body };
    res.json({ message: 'Event updated successfully' });
  });
  
  app.delete('/events/:id', authorize, (req, res) => {
    
  });