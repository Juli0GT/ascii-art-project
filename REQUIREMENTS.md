# ASCII ART WITH WEBSCOKETS

We would like you to implement a web application (frontend + backend) that allows users to upload a
text file containing ASCII art image and input an interval in milliseconds.

When the user hits “Print”, the file gets uploaded to the server. Then, the frontend should listen on a
WebSocket for data. The backend pushes the uploaded file, line by line, via WebSocket, with a timeout
between each line, as selected by the interval. The frontend should also show the percentage of the
printed image.
