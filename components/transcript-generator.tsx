"use client"

import { useState, useRef } from "react"
import html2canvas from "html2canvas"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Download, Eye, RefreshCw } from "lucide-react"

interface Course {
  id: string
  name: string
  credit: number
  grade: string
  score: number
  semester: string
}

const generateRandomTranscript = () => {
  const courses = [
    { name: "Calculus I", credit: 4, semester: "Fall 2021" },
    { name: "English Composition", credit: 3, semester: "Fall 2021" },
    { name: "Introduction to Psychology", credit: 3, semester: "Fall 2021" },
    { name: "Computer Science Fundamentals", credit: 4, semester: "Fall 2021" },
    { name: "Statistics", credit: 3, semester: "Spring 2022" },
    { name: "Data Structures", credit: 4, semester: "Spring 2022" },
    { name: "Microeconomics", credit: 3, semester: "Spring 2022" },
    { name: "Physics I", credit: 4, semester: "Fall 2022" },
    { name: "Database Systems", credit: 3, semester: "Fall 2022" },
    { name: "Software Engineering", credit: 3, semester: "Spring 2023" },
  ]

  const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"]
  const scoreRanges = {
    "A+": [97, 100],
    A: [93, 96],
    "A-": [90, 92],
    "B+": [87, 89],
    B: [83, 86],
    "B-": [80, 82],
    "C+": [77, 79],
    C: [73, 76],
  }

  return courses.map((course, index) => {
    const grade = grades[Math.floor(Math.random() * grades.length)]
    const [min, max] = scoreRanges[grade as keyof typeof scoreRanges]
    const score = Math.floor(Math.random() * (max - min + 1)) + min

    return {
      id: `course-${index}`,
      name: course.name,
      credit: course.credit,
      grade,
      score,
      semester: course.semester,
    }
  })
}

const generateRandomStudentInfo = () => {
  const names = ["John Smith", "Emily Johnson", "Michael Brown", "Sarah Davis", "David Wilson", "Jessica Miller"]
  const universities = ["Harvard University", "Stanford University", "MIT", "Yale University", "Princeton University"]
  const majors = ["Computer Science", "Business Administration", "Psychology", "Biology", "Economics", "Engineering"]

  return {
    studentName: names[Math.floor(Math.random() * names.length)],
    studentId: `${String(Math.floor(Math.random() * 900000) + 100000)}`,
    university: universities[Math.floor(Math.random() * universities.length)],
    major: majors[Math.floor(Math.random() * majors.length)],
    admissionDate: "2021-09-01",
    graduationDate: "2025-05-15",
    dateOfBirth: "2003-05-15",
  }
}

export function TranscriptGenerator() {
  const [studentInfo, setStudentInfo] = useState(generateRandomStudentInfo())
  const [courses, setCourses] = useState<Course[]>(generateRandomTranscript())
  const transcriptRef = useRef<HTMLDivElement>(null)

  const downloadTranscript = async () => {
    if (transcriptRef.current) {
      const canvas = await html2canvas(transcriptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      })
      
      const link = document.createElement('a')
      link.download = `成绩单_${studentInfo.studentName || 'Student'}_${studentInfo.university || 'University'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  const handleStudentInfoChange = (field: string, value: string) => {
    setStudentInfo((prev) => ({ ...prev, [field]: value }))
  }

  const addCourse = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      name: "",
      credit: 3,
      grade: "A",
      score: 90,
      semester: "Spring 2024",
    }
    setCourses((prev) => [...prev, newCourse])
  }

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses((prev) => prev.map((course) => (course.id === id ? { ...course, [field]: value } : course)))
  }

  const removeCourse = (id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id))
  }

  const randomizeData = () => {
    setStudentInfo(generateRandomStudentInfo())
    setCourses(generateRandomTranscript())
  }

  // Calculate GPA using 4.0 scale
  const calculateGPA = () => {
    const gradePoints = {
      "A+": 4.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    }
    const totalCredits = courses.reduce((sum, course) => sum + course.credit, 0)
    const totalPoints = courses.reduce(
      (sum, course) => sum + course.credit * (gradePoints[course.grade as keyof typeof gradePoints] || 0),
      0,
    )
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00"
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              学生信息
              <Button variant="outline" size="sm" onClick={randomizeData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                随机生成
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName">学生姓名</Label>
                <Input
                  id="studentName"
                  value={studentInfo.studentName}
                  onChange={(e) => handleStudentInfoChange("studentName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="studentId">学号</Label>
                <Input
                  id="studentId"
                  value={studentInfo.studentId}
                  onChange={(e) => handleStudentInfoChange("studentId", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="university">大学名称</Label>
              <Input
                id="university"
                value={studentInfo.university}
                onChange={(e) => handleStudentInfoChange("university", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="major">专业</Label>
                <Input
                  id="major"
                  value={studentInfo.major}
                  onChange={(e) => handleStudentInfoChange("major", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">出生日期</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={studentInfo.dateOfBirth}
                  onChange={(e) => handleStudentInfoChange("dateOfBirth", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="admissionDate">入学日期</Label>
                <Input
                  id="admissionDate"
                  type="date"
                  value={studentInfo.admissionDate}
                  onChange={(e) => handleStudentInfoChange("admissionDate", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="graduationDate">毕业日期</Label>
                <Input
                  id="graduationDate"
                  type="date"
                  value={studentInfo.graduationDate}
                  onChange={(e) => handleStudentInfoChange("graduationDate", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              课程成绩
              <Button onClick={addCourse} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                添加课程
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {courses.map((course) => (
                <div key={course.id} className="grid grid-cols-12 gap-2 items-center p-3 border rounded-lg">
                  <div className="col-span-4">
                    <Input
                      placeholder="课程名称"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="学分"
                      value={course.credit}
                      onChange={(e) => updateCourse(course.id, "credit", Number.parseInt(e.target.value) || 0)}
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Select value={course.grade} onValueChange={(value) => updateCourse(course.id, "grade", value)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="C+">C+</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D+">D+</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="分数"
                      value={course.score}
                      onChange={(e) => updateCourse(course.id, "score", Number.parseInt(e.target.value) || 0)}
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-1">
                    <Button variant="outline" size="sm" onClick={() => removeCourse(course.id)} className="p-2">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-4">
              <Button className="flex-1" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                预览成绩单
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={downloadTranscript}>
                <Download className="w-4 h-4 mr-2" />
                下载PNG
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Official Transcript Preview</CardTitle>
          <CardDescription>Real-time preview of the generated transcript</CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={transcriptRef} className="bg-white border-2 border-gray-300 rounded-lg p-8 text-sm shadow-lg">
            {/* Official Header */}
            <div className="text-center border-b-4 border-blue-800 pb-6 mb-6">
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-lg font-bold">SEAL</span>
              </div>
              <h1 className="text-2xl font-bold text-blue-900 font-serif mb-2">{studentInfo.university}</h1>
              <h2 className="text-lg font-semibold text-blue-800 mb-1">OFFICIAL TRANSCRIPT</h2>
              <p className="text-sm text-gray-600">This document contains the complete academic record</p>
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-2 gap-8 mb-6 bg-gray-50 p-4 rounded">
              <div>
                <h3 className="font-bold text-blue-800 mb-2 border-b border-blue-200">STUDENT INFORMATION</h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Name:</span> {studentInfo.studentName}
                  </p>
                  <p>
                    <span className="font-medium">Student ID:</span> {studentInfo.studentId}
                  </p>
                  <p>
                    <span className="font-medium">Date of Birth:</span> {studentInfo.dateOfBirth}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-blue-800 mb-2 border-b border-blue-200">ACADEMIC PROGRAM</h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Major:</span> {studentInfo.major}
                  </p>
                  <p>
                    <span className="font-medium">Admitted:</span> {studentInfo.admissionDate}
                  </p>
                  <p>
                    <span className="font-medium">Graduated:</span> {studentInfo.graduationDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Record */}
            <div className="mb-6">
              <h3 className="font-bold text-blue-800 mb-3 border-b-2 border-blue-200">ACADEMIC RECORD</h3>
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-400 px-3 py-2 text-left font-bold">Course Title</th>
                    <th className="border border-gray-400 px-2 py-2 text-center font-bold">Credits</th>
                    <th className="border border-gray-400 px-2 py-2 text-center font-bold">Grade</th>
                    <th className="border border-gray-400 px-2 py-2 text-center font-bold">Term</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="border border-gray-400 px-3 py-2">{course.name}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">{course.credit}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">
                        <Badge variant={course.grade.startsWith("A") ? "default" : "secondary"} className="text-xs">
                          {course.grade}
                        </Badge>
                      </td>
                      <td className="border border-gray-400 px-2 py-2 text-center text-xs">{course.semester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Academic Summary */}
            <div className="grid grid-cols-2 gap-8 pt-4 border-t-2 border-blue-200 bg-blue-50 p-4 rounded">
              <div>
                <h3 className="font-bold text-blue-800 mb-2">ACADEMIC SUMMARY</h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Total Credits Earned:</span>{" "}
                    {courses.reduce((sum, course) => sum + course.credit, 0)}
                  </p>
                  <p>
                    <span className="font-medium">Cumulative GPA:</span>{" "}
                    <span className="font-bold text-lg">{calculateGPA()}</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-blue-800 mb-2">CERTIFICATION</h3>
                <div className="space-y-1 text-xs">
                  <p className="font-medium">
                    This is to certify that the above is a true and complete record of the academic work completed by
                    the student named herein.
                  </p>
                  <p className="mt-3">
                    <span className="font-medium">Date Issued:</span> {new Date().toLocaleDateString("en-US")}
                  </p>
                  <p>
                    <span className="font-medium">Registrar:</span> Office of the Registrar
                  </p>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-4 text-center text-xs text-gray-500 border-t pt-2">
              <p>*** OFFICIAL TRANSCRIPT - ISSUED DIRECTLY TO STUDENT ***</p>
              <p>This transcript is printed on security paper and contains anti-fraud features</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
