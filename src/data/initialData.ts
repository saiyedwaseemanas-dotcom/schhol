import { Student, Teacher, Chapter, AdministrativeAlert } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    rollNo: '01',
    name: 'Aarav Patel',
    classId: '10-A',
    guardianName: 'Sunil Patel',
    guardianRelation: 'Father',
    phone: '+91 98765 43210',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjnvEo4rntnVlzhL_NbNVaY5aV2Y748brFVD8M2w8R6FZj-sZi3Idkok1Gx2tRrAOlaWATe0ed2THYGEhcctg6BkLSQrR78hDguAY3ab5wbBZZtuCfPh2p5C1UUVePZtRUhe0In18o1_kzLSTzFY4aL271VNubkzdGPGiOQ4cwzliov16tppBzFlQ9aZMOPGZbinyUglE8jCMYgOxoQ-RFeRkCSZ-nFYxFYvue5uCZjArCvu8rwJrk',
    attendancePercentage: 94.5,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 47, science: 45, english: 44, socialScience: 48, hindi: 46 },
      'UT-2': { math: 48, science: 46, english: 45, socialScience: 49, hindi: 47 },
      'Mid-Term': { math: 92, science: 90, english: 88, socialScience: 95, hindi: 91 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-2',
    rollNo: '02',
    name: 'Ananya Sharma',
    classId: '10-A',
    guardianName: 'Rashmi Sharma',
    guardianRelation: 'Mother',
    phone: '+91 98765 43211',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2TMiF9jA-VdX-snEiDHEeLTaLPtJVm-HU8uqwacukmuNfI8nlUlpPpmwjqQ2lhTqLIvYtqBdhTlPE0t55jP7UCKEkjkiK6UdcP9IYp4BSg0oeEgcpUslB5yXmqh4wPOiyHWmEocXHUKMuNW36rQOLtXvNsa4Biu3-Aw4KrK9MYRbSwwaeB0t7uyXP7MFUL-v82s6lhBj85ha2eYE_MKDjOTS3c0pobs703_g1oNwn76XaMBVIi167',
    attendancePercentage: 91.2,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 45, science: 46, english: 42, socialScience: 46, hindi: 45 },
      'UT-2': { math: 46, science: 47, english: 43, socialScience: 47, hindi: 46 },
      'Mid-Term': { math: 89, science: 92, english: 86, socialScience: 91, hindi: 88 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-3',
    rollNo: '03',
    name: 'Kabir Mehta',
    classId: '10-A',
    guardianName: 'Dinesh Mehta',
    guardianRelation: 'Father',
    phone: '+91 98765 43212',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwPRUkPExYzwOFERZnY0PqJsBp6UKVM8Lij9IAbKL4YBOciP-RwOUQX18-vyh68J11aJjlDIZXU7oVf2y1GqzxXbLHBz8aVkx8GU6VqN4TnqTjY38Himiooh9kbC-3j8TQETCJh9Xi4fMLN7OG1CaVIP5g2MLVpIV7K5YADd9ZgfNE8mbekYmARcrD34ZTIo46C_-D3OS5-0joKdmlBDSKJGZsLmFlBdm7gwoRMz2NzQGTC0z-hHT2',
    attendancePercentage: 71.4,
    todayStatus: 'A',
    isDefaulter: true,
    note: 'Critical Defaulter Warning (<75%)',
    marks: {
      'UT-1': { math: 26, science: 29, english: 28, socialScience: 32, hindi: 30 },
      'UT-2': { math: 28, science: 31, english: 30, socialScience: 33, hindi: 31 },
      'Mid-Term': { math: 55, science: 60, english: 58, socialScience: 65, hindi: 62 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-4',
    rollNo: '04',
    name: 'Diya Kapoor',
    classId: '10-A',
    guardianName: 'Sanjay Kapoor',
    guardianRelation: 'Father',
    phone: '+91 98765 43213',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJMKJfLwrQNeZeGCNYRBqMvUanZ_WLQM1fnxbnAGQtuSBue8PeLqE5kNiB1Fn5pEn2py8vVTr1Tgqd2kqEA8N8hQcPFaM92JZXUr8XkVYP8fX716Z7jsmtkeqsh-Lbs1YyNOewVyJkozMv7MQrs7T6jvurIB0NyLiRvRt1q6O37dKmOcrQ3LgvNo4JEx5euEyNYvrn9Uxyt6w2ET9jE2Nnbp6N7OQ6jUfZv1Pyijn8N6lok2Ycf2-D',
    attendancePercentage: 88.0,
    todayStatus: 'L',
    note: 'Medical Slip attached',
    marks: {
      'UT-1': { math: 42, science: 40, english: 39, socialScience: 44, hindi: 43 },
      'UT-2': { math: 44, science: 42, english: 40, socialScience: 45, hindi: 44 },
      'Mid-Term': { math: 85, science: 82, english: 80, socialScience: 88, hindi: 86 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-5',
    rollNo: '05',
    name: 'Rohan Verma',
    classId: '10-A',
    guardianName: 'Vikram Verma',
    guardianRelation: 'Father',
    phone: '+91 98765 43214',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5hpYszM2u2nm-8gJsNurJABLJr7tBoNe6Q6tLuHr_rFhjuNL_4EuNmj2olX_sovzkIDsGETikUtHxvD-JqlzIO6fJfW83V_OF0SZb6SU9gJdhAy1sdzDrxpG5k9bk0g0gehzeGT3lKkS6-0b_QW1oL2yxaqg5bTWOxVxVMZY6o3mIUNUO5Uv557sUECPuxdefld5mqaGnIcYcx14LqYz_--H5uI17R4fBhTPG0nKcZUX0Uw_fOxgh',
    attendancePercentage: 96.0,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 46, science: 44, english: 41, socialScience: 47, hindi: 44 },
      'UT-2': { math: 47, science: 45, english: 42, socialScience: 48, hindi: 45 },
      'Mid-Term': { math: 91, science: 88, english: 84, socialScience: 93, hindi: 89 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-6',
    rollNo: '06',
    name: 'Sneha Gupta',
    classId: '10-A',
    guardianName: 'Ramesh Gupta',
    guardianRelation: 'Father',
    phone: '+91 98765 43215',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 82.5,
    todayStatus: 'HD',
    note: 'Gate Pass 12:30 PM',
    marks: {
      'UT-1': { math: 39, science: 40, english: 38, socialScience: 42, hindi: 41 },
      'UT-2': { math: 40, science: 41, english: 39, socialScience: 43, hindi: 42 },
      'Mid-Term': { math: 78, science: 80, english: 76, socialScience: 84, hindi: 82 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-7',
    rollNo: '07',
    name: 'Vikram Joshi',
    classId: '10-A',
    guardianName: 'Alok Joshi',
    guardianRelation: 'Father',
    phone: '+91 98765 43216',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 78.0,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 36, science: 38, english: 35, socialScience: 39, hindi: 38 },
      'UT-2': { math: 38, science: 39, english: 37, socialScience: 40, hindi: 39 },
      'Mid-Term': { math: 72, science: 76, english: 70, socialScience: 78, hindi: 75 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-8',
    rollNo: '08',
    name: 'Ishaan Reddy',
    classId: '10-A',
    guardianName: 'Naveen Reddy',
    guardianRelation: 'Father',
    phone: '+91 98765 43217',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 64.0,
    todayStatus: 'A',
    isDefaulter: true,
    note: 'Under statutory 75% limit',
    marks: {
      'UT-1': { math: 30, science: 32, english: 31, socialScience: 35, hindi: 33 },
      'UT-2': { math: 31, science: 33, english: 30, socialScience: 36, hindi: 34 },
      'Mid-Term': { math: 62, science: 65, english: 61, socialScience: 70, hindi: 67 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-9',
    rollNo: '09',
    name: 'Meera Iyer',
    classId: '10-A',
    guardianName: 'Lakshmi Iyer',
    guardianRelation: 'Mother',
    phone: '+91 98765 43218',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 92.8,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 43, science: 44, english: 46, socialScience: 45, hindi: 47 },
      'UT-2': { math: 45, science: 45, english: 47, socialScience: 46, hindi: 48 },
      'Mid-Term': { math: 88, science: 89, english: 94, socialScience: 90, hindi: 95 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-10',
    rollNo: '10',
    name: 'Tanvi Nair',
    classId: '10-A',
    guardianName: 'Suresh Nair',
    guardianRelation: 'Father',
    phone: '+91 98765 43219',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 89.4,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 41, science: 43, english: 42, socialScience: 44, hindi: 43 },
      'UT-2': { math: 42, science: 44, english: 43, socialScience: 45, hindi: 44 },
      'Mid-Term': { math: 82, science: 86, english: 85, socialScience: 88, hindi: 86 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-11',
    rollNo: '11',
    name: 'Aryan Singhania',
    classId: '10-A',
    guardianName: 'Rajeev Singhania',
    guardianRelation: 'Father',
    phone: '+91 98765 43220',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 90.1,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 44, science: 42, english: 40, socialScience: 43, hindi: 42 },
      'UT-2': { math: 45, science: 43, english: 41, socialScience: 44, hindi: 43 },
      'Mid-Term': { math: 87, science: 85, english: 82, socialScience: 86, hindi: 84 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-12',
    rollNo: '12',
    name: 'Kavya Pillai',
    classId: '10-A',
    guardianName: 'Madhavan Pillai',
    guardianRelation: 'Father',
    phone: '+91 98765 43221',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 93.0,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 43, science: 45, english: 44, socialScience: 46, hindi: 45 },
      'UT-2': { math: 44, science: 46, english: 45, socialScience: 47, hindi: 46 },
      'Mid-Term': { math: 86, science: 90, english: 88, socialScience: 92, hindi: 90 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-13',
    rollNo: '13',
    name: 'Dhruv Chauhan',
    classId: '10-A',
    guardianName: 'Bhavna Chauhan',
    guardianRelation: 'Mother',
    phone: '+91 98765 43222',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 86.5,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 38, science: 39, english: 41, socialScience: 40, hindi: 42 },
      'UT-2': { math: 39, science: 40, english: 42, socialScience: 41, hindi: 43 },
      'Mid-Term': { math: 77, science: 79, english: 83, socialScience: 81, hindi: 85 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-14',
    rollNo: '14',
    name: 'Prisha Saxena',
    classId: '10-A',
    guardianName: 'Deepak Saxena',
    guardianRelation: 'Father',
    phone: '+91 98765 43223',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 91.0,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 42, science: 41, english: 43, socialScience: 45, hindi: 44 },
      'UT-2': { math: 43, science: 42, english: 44, socialScience: 46, hindi: 45 },
      'Mid-Term': { math: 84, science: 83, english: 87, socialScience: 91, hindi: 88 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-15',
    rollNo: '15',
    name: 'Arjun Nambiar',
    classId: '10-A',
    guardianName: 'Gopal Nambiar',
    guardianRelation: 'Father',
    phone: '+91 98765 43224',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 87.2,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 39, science: 41, english: 40, socialScience: 42, hindi: 41 },
      'UT-2': { math: 41, science: 42, english: 41, socialScience: 43, hindi: 42 },
      'Mid-Term': { math: 80, science: 83, english: 81, socialScience: 85, hindi: 83 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  // Class 10-B Students (14 students)
  {
    id: 'std-16',
    rollNo: '01',
    name: 'Siddharth Rao',
    classId: '10-B',
    guardianName: 'Venkatesh Rao',
    guardianRelation: 'Father',
    phone: '+91 98765 43225',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 89.0,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 41, science: 38, english: 42, socialScience: 40, hindi: 41 },
      'UT-2': { math: 42, science: 39, english: 43, socialScience: 41, hindi: 42 },
      'Mid-Term': { math: 82, science: 76, english: 84, socialScience: 80, hindi: 82 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-17',
    rollNo: '02',
    name: 'Tara Mukherjee',
    classId: '10-B',
    guardianName: 'Anirban Mukherjee',
    guardianRelation: 'Father',
    phone: '+91 98765 43226',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 94.0,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 46, science: 43, english: 47, socialScience: 48, hindi: 46 },
      'UT-2': { math: 47, science: 44, english: 48, socialScience: 49, hindi: 47 },
      'Mid-Term': { math: 92, science: 86, english: 95, socialScience: 96, hindi: 93 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-18',
    rollNo: '03',
    name: 'Yashwardhan Roy',
    classId: '10-B',
    guardianName: 'Debabrata Roy',
    guardianRelation: 'Father',
    phone: '+91 98765 43227',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 74.0,
    todayStatus: 'A',
    isDefaulter: true,
    note: 'Attendance Warning (<75%)',
    marks: {
      'UT-1': { math: 31, science: 28, english: 35, socialScience: 34, hindi: 36 },
      'UT-2': { math: 32, science: 30, english: 36, socialScience: 35, hindi: 37 },
      'Mid-Term': { math: 63, science: 59, english: 71, socialScience: 69, hindi: 73 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-19',
    rollNo: '04',
    name: 'Zoya Khan',
    classId: '10-B',
    guardianName: 'Farhan Khan',
    guardianRelation: 'Father',
    phone: '+91 98765 43228',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 92.5,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 44, science: 42, english: 45, socialScience: 46, hindi: 44 },
      'UT-2': { math: 45, science: 43, english: 46, socialScience: 47, hindi: 45 },
      'Mid-Term': { math: 88, science: 85, english: 90, socialScience: 92, hindi: 89 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  // Class 9-A Students (11 students)
  {
    id: 'std-20',
    rollNo: '01',
    name: 'Riya Sen',
    classId: '9-A',
    guardianName: 'Amitabh Sen',
    guardianRelation: 'Father',
    phone: '+91 98765 43229',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSXJDTOzKh7tCmnOqQKtUuk1W4a1FI5lFpSOdKJEYbE2J5LgiO20W5T_KJiVSKWUDcex8Kv6Q0_Viow_WEMb89dcsBjgT9Mw08PqEot2nqN2qveskfFkS-gWJDrlqUMvr7LjTATrA6xDz9VYQJko8d8fJbD75SVqzrzEOciEcdjm3xehw7tVAbHzbTNjbUXybnEc6nQdTX4fjzQWgDxN7mx2jMYrEHYmKgm5jCbp1Kjlbd3vZpaPhX',
    attendancePercentage: 68.0,
    todayStatus: 'A',
    isDefaulter: true,
    note: '68% Critical Defaulter',
    marks: {
      'UT-1': { math: 29, science: 31, english: 33, socialScience: 32, hindi: 34 },
      'UT-2': { math: 30, science: 32, english: 34, socialScience: 33, hindi: 35 },
      'Mid-Term': { math: 60, science: 64, english: 68, socialScience: 66, hindi: 70 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  },
  {
    id: 'std-21',
    rollNo: '02',
    name: 'Neel Banerjee',
    classId: '9-A',
    guardianName: 'Soumitra Banerjee',
    guardianRelation: 'Father',
    phone: '+91 98765 43230',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    attendancePercentage: 95.0,
    todayStatus: 'P',
    marks: {
      'UT-1': { math: 47, science: 48, english: 44, socialScience: 45, hindi: 46 },
      'UT-2': { math: 48, science: 49, english: 45, socialScience: 46, hindi: 47 },
      'Mid-Term': { math: 94, science: 96, english: 89, socialScience: 91, hindi: 93 },
      'Final': { math: 0, science: 0, english: 0, socialScience: 0, hindi: 0 }
    }
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-1',
    name: 'Mr. Rajesh Kumar',
    qualification: 'M.Sc (Math), B.Ed',
    designation: 'PGT Head & Secondary Coordinator',
    subject: 'Mathematics',
    status: 'In Campus',
    checkInTime: '07:48 AM',
    checkOutTime: '02:30 PM',
    leaveBalance: { cl: 3, sl: 5, el: 8 },
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRJXIZXZlPwjRjqIdOewHPrqmWVOfX_qSru1pJ4WirWTXPNZvY0S0m91pApGPNwpN-tpHLrm58mwrWDnLONhFcfRwAtzmf1p9S9nc5pAJxG6JtPo_AU0LJuOslTFgl-NtLxuV91O1tGpvnBNFm1Q6KKRqcqJKN4aetgHeKjZytR2h9fLqewHXToZhSvDAKKom9gG1OsVSX3ZwfuoMb1otyvXU900pGg1kofiNzM7c8PGt_ahQd-QbK',
    phone: '+91 98111 22334',
    email: 'principal@dpssec4.edu'
  },
  {
    id: 'tch-2',
    name: 'Ms. Sunita Rao',
    qualification: 'M.Sc (Physics), M.Ed',
    designation: 'TGT Lead',
    subject: 'Science',
    status: 'On Duty (Exam)',
    checkInTime: '07:55 AM',
    checkOutTime: '02:30 PM',
    leaveBalance: { cl: 2, sl: 6, el: 11 },
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98111 22335',
    email: 'sunita.rao@dpssec4.edu'
  },
  {
    id: 'tch-3',
    name: 'Ms. Preeti Sharma',
    qualification: 'M.Sc (Chemistry), B.Ed',
    designation: 'Senior Faculty',
    subject: 'Science (10-B)',
    status: 'In Campus',
    checkInTime: '07:50 AM',
    checkOutTime: '02:30 PM',
    leaveBalance: { cl: 4, sl: 7, el: 9 },
    avatarUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98111 22336',
    email: 'preeti.sharma@dpssec4.edu'
  },
  {
    id: 'tch-4',
    name: 'Mr. Arvind Verma',
    qualification: 'M.Sc (Physics), NET',
    designation: 'Faculty - Physics',
    subject: 'Physics',
    status: 'In Campus',
    checkInTime: '07:52 AM',
    checkOutTime: '02:30 PM',
    leaveBalance: { cl: 1, sl: 4, el: 12 },
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98111 22337',
    email: 'arvind.verma@dpssec4.edu'
  },
  {
    id: 'tch-5',
    name: 'Ms. Priya Sen',
    qualification: 'M.A (English), B.Ed',
    designation: 'Class Teacher 10-A',
    subject: 'English',
    status: 'In Campus',
    checkInTime: '07:45 AM',
    checkOutTime: '02:30 PM',
    leaveBalance: { cl: 3, sl: 5, el: 10 },
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98111 22338',
    email: 'priya.sen@dpssec4.edu'
  }
];

export const INITIAL_CHAPTERS: Chapter[] = [
  {
    id: 'chap-1',
    unitNumber: 1,
    name: 'Real Numbers',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 6,
    completedPeriods: 6,
    status: 'Completed',
    completionDate: '2024-08-12',
    notes: 'Completed with NCERT exercises + Exemplar questions thoroughly discussed.',
    homework: 'Exercise 1.4 Q1-Q5 & Chapter Revision Worksheet #1.'
  },
  {
    id: 'chap-2',
    unitNumber: 2,
    name: 'Polynomials',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 8,
    completedPeriods: 8,
    status: 'Completed',
    completionDate: '2024-08-28',
    notes: 'Formula sheet distributed; students quizzed on quadratic roots.',
    homework: 'Ex 2.3 all questions & peer check completed.'
  },
  {
    id: 'chap-3',
    unitNumber: 3,
    name: 'Pair of Linear Equations',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 10,
    completedPeriods: 10,
    status: 'Completed',
    completionDate: '2024-09-15',
    notes: 'Graphical and algebraic solutions verified through peer grading.',
    homework: 'Graph sheets Q1-Q8.'
  },
  {
    id: 'chap-4',
    unitNumber: 4,
    name: 'Quadratic Equations',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 8,
    completedPeriods: 8,
    status: 'Completed',
    completionDate: '2024-10-02',
    notes: 'Unit test scheduled for next Monday. Quadratic formula application practiced.',
    homework: 'Ex 4.4 word problems.'
  },
  {
    id: 'chap-5',
    unitNumber: 5,
    name: 'Arithmetic Progressions',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 8,
    completedPeriods: 5,
    status: 'In Progress',
    notes: 'Sum of n terms in progress. Class understanding is solid.',
    homework: 'Sum of n terms problems: Exercise 5.3 questions 1 to 10.'
  },
  {
    id: 'chap-6',
    unitNumber: 6,
    name: 'Triangles',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 12,
    completedPeriods: 0,
    status: 'Not Started',
    scheduledDate: '2024-10-18',
    notes: 'Prerequisite: Geometric construction instruments required.'
  },
  {
    id: 'chap-7',
    unitNumber: 7,
    name: 'Coordinate Geometry',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 8,
    completedPeriods: 0,
    status: 'Not Started',
    scheduledDate: '2024-11-04',
    notes: 'Distance formula and section formula units.'
  },
  {
    id: 'chap-8',
    unitNumber: 8,
    name: 'Introduction to Trigonometry',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 10,
    completedPeriods: 0,
    status: 'Not Started',
    scheduledDate: '2024-11-18'
  },
  {
    id: 'chap-9',
    unitNumber: 9,
    name: 'Some Applications of Trigonometry',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 8,
    completedPeriods: 0,
    status: 'Not Started',
    scheduledDate: '2024-12-02'
  },
  {
    id: 'chap-10',
    unitNumber: 10,
    name: 'Circles',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 8,
    completedPeriods: 0,
    status: 'Not Started',
    scheduledDate: '2024-12-14'
  },
  {
    id: 'chap-11',
    unitNumber: 11,
    name: 'Areas Related to Circles',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 6,
    completedPeriods: 0,
    status: 'Not Started',
    scheduledDate: '2025-01-05'
  },
  {
    id: 'chap-12',
    unitNumber: 12,
    name: 'Surface Areas and Volumes',
    subject: 'Mathematics',
    classId: '10-A',
    allottedPeriods: 10,
    completedPeriods: 0,
    status: 'Not Started',
    scheduledDate: '2025-01-18'
  }
];

export const INITIAL_ALERTS: AdministrativeAlert[] = [
  {
    id: 'alert-1',
    type: 'attendance',
    title: '2 Attendance Defaulters Identified',
    subtitle: 'Roll 08 (64%), Roll 29 (69%) under statutory 75% limit',
    description: 'Kabir Mehta (71.4%) & Riya Sen (68.0%) require mandatory parent conference call.',
    severity: 'critical'
  },
  {
    id: 'alert-2',
    type: 'syllabus',
    title: 'Critical Syllabus Alert: Class 10-B • Science',
    subtitle: 'Current pace is 42% completed (4 chapters behind projected mid-term schedule)',
    description: 'Teacher: Ms. Preeti Sharma. Immediate catch-up plan required before Pre-board.',
    teacherName: 'Ms. Preeti Sharma',
    severity: 'critical'
  },
  {
    id: 'alert-3',
    type: 'syllabus',
    title: 'Curriculum Delay Identified',
    subtitle: 'Class 10-B • Physics by Mr. Verma',
    description: 'Chapter 4: Magnetic Effects of Electric Current is 12 Days Pending (Target was Oct 12).',
    teacherName: 'Mr. Arvind Verma',
    daysPending: 12,
    severity: 'warning'
  }
];
