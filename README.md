
# Custom Video Bifurcator for Crio.do by Team Tech Titans

This repository aims to provide a well automated solution for the Video Bifuracation problem of the Session videos. This repository will provide you with a decent enough solution for this problem.
The Video Bifurcator is a tool designed to enhance the learning experience at Crio.do. It allows you to seamlessly manage and optimize recorded live lectures, making them more accessible and engaging for students.

# Problem Statement
The problem Statement was that we have to develop a system that can automate the process of Bifuracation.

# Approach
Let's consider what is the imformation we have at our disposal:

- First we have the session videos itself.
- Second we have the session material like ppts.
- Third and most important, how the teaching is done at crio.
  
[Uploading VEED - Free Online Screen & Webcam Recorder.webm…]()

# Information from Session Videos
The Information from the session videos can be added extracted in two forms:
- Audio
- Video

## The Problem with Audio Information
Audio Information can provide with a lot of insights, but the problem is that for our usecase we require the audio converted to be converted to text first and all the free services used for audio to text conversion are severely limited. For eg: They limits like 10 minutes of audio conversion per minute per user.\
And all the good services are paid which restricts us in what we can do with audio. But still we have used some insights from the audio which we will discuss later.

# Methodology
For this method we have heavily relied on the Information we are getting from the video. But first let us discuss how the teaching is done at crio. Usually at start of session mentor waits for some time for the users to join then they start teaching and the flow of teaching is usually guided by the ppts provided to them by the crio. So usually when starting with a new section they start by first showing the ppt to the user's.

So what we did was, we converted the whole session video into individual frames with 1 frame for each second and extract the text from each frame to a text file. Then we took the original ppts we have for those sessions and extracted only the headings from those ppts and stored it inside a file called headings.json, and then we check in each frame if those headings are present or not and by we know that here is where that particular section mentioned in the slide is starting hence giving us a timestamp.

# Extra Features we have introduced in our application
Along with the Bifuracation it also automates the process of providing subtitles for the session video using the AWS Transcriber service and gives us the .srt subtitle file which we then add to the video using the ffmpeg library.

And by using the subtitles we are also able to find the time when the actual sessions starts which helps us in better Bifuracating the video.

# Challenges we faced 
Some of the Challenges we faced during our development are:
- Finding suitable library for ppt to text conversion, we could not find any in javascript so for this particular service we went for python.
- Handling situations where the instructor may move to next slide by mistake and then com back to the current slide. etc.


# Learnings
Taking upon this project was very challenging for us and we learnt a lot of things during the hackathon which we never knew even existed. Overall this hackathon has helped us to improve our abilities by applying them on real world problems.



