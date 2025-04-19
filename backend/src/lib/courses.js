// courses_with_thumbnails.js

const courses = [
    {
      id: 'react101',
      title: 'React for Beginners',
      description: 'Learn how to build awesome UIs with React.js!',
      thumbnail: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&h=400&fit=crop&w=800',
      modules: [...Array(25)].map((_, idx) => ({ id: `mod${idx+1}`, title: `Module ${idx+1}`, isCompleted: false })),
      assigned: 'true',
    },
    {
      id: 'nodejs-basics',
      title: 'Node.js Essentials',
      description: 'Master backend development with Node.js.',
      thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&h=400&w=800',
      modules: [...Array(25)].map((_, idx) => ({ id: `mod${idx+1}`, title: `Module ${idx+1}`, isCompleted: false })),
      assigned: "false",
    },
    {
      id: 'aws-cloud',
      title: 'AWS Cloud Fundamentals',
      description: 'Learn about cloud computing with AWS.',
      thumbnail: 'https://images.pexels.com/photos/1181266/pexels-photo-1181266.jpeg?auto=compress&cs=tinysrgb&h=400&fit=crop&w=800',
      modules: [...Array(25)].map((_, idx) => ({ id: `mod${idx+1}`, title: `Module ${idx+1}`, isCompleted: false })),
      assigned: "true",
    },
    {
      id: 'ml-intro',
      title: 'Introduction to Machine Learning',
      description: 'Get started with machine learning and AI.',
      thumbnail: 'https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg?auto=compress&cs=tinysrgb&h=400&w=800',
      modules: [...Array(30)].map((_, idx) => ({ id: `mod${idx+1}`, title: `Lesson ${idx+1}`, isCompleted: false })),
      assigned: "false",
    },
    {
      id: 'ux-design',
      title: 'UI/UX Design Mastery',
      description: 'Design stunning user experiences and interfaces.',
      thumbnail: 'https://images.pexels.com/photos/1181267/pexels-photo-1181267.jpeg?auto=compress&cs=tinysrgb&h=400&fit=crop&w=800',
      modules: [...Array(25)].map((_, idx) => ({ id: `mod${idx+1}`, title: `Topic ${idx+1}`, isCompleted: false })),
      assigned: "true",
    },
    {
      id: 'cybersecurity101',
      title: 'Cybersecurity Basics',
      description: 'Learn the fundamentals of cybersecurity.',
      thumbnail: 'https://images.pexels.com/photos/1181269/pexels-photo-1181269.jpeg?auto=compress&cs=tinysrgb&h=400&fit=crop&w=800',
      modules: [...Array(30)].map((_, idx) => ({ id: `mod${idx+1}`, title: `Session ${idx+1}`, isCompleted: false })),
      assigned: "false",
    },
    {
      id: 'android-dev',
      title: 'Android App Development',
      description: 'Create your first Android application.',
      thumbnail: 'https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&h=400&w=800',
      modules: [...Array(25)].map((_, idx) => ({ id: `mod${idx+1}`, title: `Module ${idx+1}`, isCompleted: false })),
      assigned: "true",
    },
    {
      id: 'devops-intro',
      title: 'DevOps Foundations',
      description: 'Understand DevOps culture and practices.',
      thumbnail: 'https://images.pexels.com/photos/1181349/pexels-photo-1181349.jpeg?auto=compress&cs=tinysrgb&h=400&fit=crop&w=800',
      modules: [...Array(28)].map((_, idx) => ({ id: `mod${idx+1}`, title: `Part ${idx+1}`, isCompleted: false })),
      assigned: "false",
    },
    {
      id: 'business-analytics',
      title: 'Business Analytics Basics',
      description: 'Learn how data drives business decisions.',
      thumbnail: 'https://images.pexels.com/photos/1181332/pexels-photo-1181332.jpeg?auto=compress&cs=tinysrgb&h=400&fit=crop&w=800',
      modules: [...Array(25)].map((_, idx) => ({ id: `mod${idx+1}`, title: `Analysis ${idx+1}`, isCompleted: false })),
      assigned: "false",
    },
    {
      id: 'finance-intro',
      title: 'Finance Fundamentals',
      description: 'Understand financial principles and strategies.',
      thumbnail: 'https://images.pexels.com/photos/1181315/pexels-photo-1181315.jpeg?auto=compress&cs=tinysrgb&h=400&fit=crop&w=800',
      modules: [...Array(26)].map((_, idx) => ({ id: `mod${idx+1}`, title: `Chapter ${idx+1}`, isCompleted: false })),
      assigned: "false",
    }
  ];
  
  export default courses;
  