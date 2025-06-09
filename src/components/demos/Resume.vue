<template>
  <div class="resume max-w-4xl mx-auto bg-white p-8 shadow-sm">
    <!-- Header -->
    <div class="text-center mb-8 pb-6 border-b-2 border-gray-200">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Sarah Johnson</h1>
      <p class="text-xl text-primary-600 mb-4">Senior Full-Stack Developer</p>
      <div class="flex justify-center space-x-6 text-sm text-gray-600">
        <span>📧 sarah.johnson@email.com</span>
        <span>📱 +1 (555) 987-6543</span>
        <span>🌐 linkedin.com/in/sarahjohnson</span>
        <span>💼 github.com/sarahjdev</span>
      </div>
    </div>

    <!-- Summary -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">Professional Summary</h2>
      <p class="text-gray-700 leading-relaxed">
        Highly skilled Full-Stack Developer with 7+ years of experience in designing and implementing scalable web applications. 
        Expertise in modern JavaScript frameworks, cloud technologies, and agile development methodologies. 
        Proven track record of leading development teams and delivering high-quality software solutions.
      </p>
    </section>

    <!-- Experience -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">Professional Experience</h2>
      <div class="space-y-6">
        <div v-for="job in experience" :key="job.id" class="border-l-4 border-primary-500 pl-4">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ job.title }}</h3>
              <p class="text-primary-600 font-medium">{{ job.company }}</p>
            </div>
            <span class="text-sm text-gray-500">{{ job.duration }}</span>
          </div>
          <ul class="text-gray-700 space-y-1 ml-4">
            <li v-for="achievement in job.achievements" :key="achievement" class="flex items-start">
              <span class="text-primary-500 mr-2">•</span>
              <span>{{ achievement }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">Technical Skills</h2>
      <div class="grid grid-cols-2 gap-6">
        <div v-for="category in skills" :key="category.name">
          <h3 class="font-semibold text-gray-900 mb-2">{{ category.name }}</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in category.items" :key="skill" 
                  class="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">Education</h2>
      <div class="space-y-4">
        <div v-for="edu in education" :key="edu.id" class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-gray-900">{{ edu.degree }}</h3>
            <p class="text-primary-600">{{ edu.school }}</p>
            <p class="text-sm text-gray-600">{{ edu.details }}</p>
          </div>
          <span class="text-sm text-gray-500">{{ edu.year }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const experience = [
  {
    id: 1,
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp Solutions',
    duration: '2021 - Present',
    achievements: [
      'Led development of microservices architecture serving 1M+ users',
      'Implemented CI/CD pipelines reducing deployment time by 75%',
      'Mentored junior developers and conducted code reviews',
      'Collaborated with product team to define technical requirements'
    ]
  },
  {
    id: 2,
    title: 'Full-Stack Developer',
    company: 'Digital Innovations Inc.',
    duration: '2019 - 2021',
    achievements: [
      'Built responsive web applications using React and Node.js',
      'Optimized database queries improving application performance by 40%',
      'Integrated third-party APIs and payment processing systems',
      'Participated in agile development processes and sprint planning'
    ]
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'StartupHub',
    duration: '2017 - 2019',
    achievements: [
      'Developed user interfaces for B2B SaaS platform',
      'Implemented responsive design for mobile and desktop',
      'Worked closely with UX designers to implement pixel-perfect designs',
      'Maintained and improved existing codebase'
    ]
  }
]

const skills = [
  {
    name: 'Frontend',
    items: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js']
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    name: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform']
  },
  {
    name: 'Tools & Others',
    items: ['Git', 'Jest', 'Webpack', 'GraphQL', 'REST APIs']
  }
]

const education = [
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Science',
    school: 'University of California, Berkeley',
    details: 'Magna Cum Laude, GPA: 3.8/4.0',
    year: '2017'
  },
  {
    id: 2,
    degree: 'AWS Certified Solutions Architect',
    school: 'Amazon Web Services',
    details: 'Professional Level Certification',
    year: '2022'
  }
]
</script>

<style scoped>
.resume {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}

@media print {
  .resume {
    box-shadow: none;
  }
}
</style> 