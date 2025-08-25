"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, RotateCcw, Eye } from "lucide-react"

interface StudentData {
  studentName: string
  studentId: string
  university: string
  customUniversity: string
  major: string
  year: string
  issueDate: string
  expirationDate: string
  studentPhoto: string | null
  studentSignature: string
}

const universities = [
  "Harvard University",
  "Stanford University",
  "Massachusetts Institute of Technology",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "University of Pennsylvania",
  "Cornell University",
  "Brown University",
  "Dartmouth College",
  "Zhejiang University",
  "自定义", // Added custom option
]

const majors = [
  "Computer Science",
  "Business Administration",
  "Psychology",
  "Biology",
  "Economics",
  "Engineering",
  "English Literature",
  "Political Science",
  "Mathematics",
  "Chemistry",
  "Faculty of Economics and Management",
]

export function StudentIdGenerator() {
  const [studentData, setStudentData] = useState<StudentData>({
    studentName: "",
    studentId: "",
    university: "",
    customUniversity: "", // Added custom university field
    major: "",
    year: "",
    issueDate: new Date().toISOString().split("T")[0],
    expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toISOString().split("T")[0],
    studentPhoto: null,
    studentSignature: "",
  })

  const [showPreview, setShowPreview] = useState(false)
  const [cardSide, setCardSide] = useState<"front" | "back">("front")

  const generateRandomData = () => {
    const names = [
      "Michael Johnson",
      "Sarah Williams",
      "David Brown",
      "Emily Davis",
      "James Wilson",
      "Ashley Miller",
      "Christopher Taylor",
      "Jessica Anderson",
    ]

    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomId = Math.floor(100000 + Math.random() * 900000).toString()
    const randomUniversity = universities[Math.floor(Math.random() * universities.length)]
    const randomMajor = majors[Math.floor(Math.random() * majors.length)]
    const currentYear = new Date().getFullYear()
    const randomYear = (currentYear + Math.floor(Math.random() * 4)).toString()
    const issueDate = new Date().toISOString().split("T")[0]
    const expirationDate = new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toISOString().split("T")[0]

    setStudentData({
      studentName: randomName,
      studentId: randomId,
      university: randomUniversity,
      customUniversity: "", // Reset custom university on random generation
      major: randomMajor,
      year: randomYear,
      issueDate,
      expirationDate,
      studentPhoto: null,
      studentSignature: randomName,
    })
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setStudentData((prev) => ({
          ...prev,
          studentPhoto: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const getUniversityName = () => {
    if (studentData.university === "自定义") {
      return studentData.customUniversity || "University Name"
    }
    return studentData.university || "Zhejiang University"
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">学生证信息</CardTitle>
          <CardDescription>填写学生证信息，或点击随机生成示例数据</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button onClick={generateRandomData} variant="outline" className="flex-1 bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              随机生成
            </Button>
            <Button onClick={() => setShowPreview(!showPreview)} variant="outline" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "隐藏预览" : "显示预览"}
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="studentName">学生姓名</Label>
              <Input
                id="studentName"
                value={studentData.studentName}
                onChange={(e) => setStudentData((prev) => ({ ...prev, studentName: e.target.value }))}
                placeholder="输入学生姓名"
              />
            </div>

            <div>
              <Label htmlFor="studentId">学号</Label>
              <Input
                id="studentId"
                value={studentData.studentId}
                onChange={(e) => setStudentData((prev) => ({ ...prev, studentId: e.target.value }))}
                placeholder="输入学号"
              />
            </div>

            <div>
              <Label htmlFor="university">大学名称</Label>
              <Select
                value={studentData.university}
                onValueChange={(value) => setStudentData((prev) => ({ ...prev, university: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择大学" />
                </SelectTrigger>
                <SelectContent>
                  {universities.map((uni) => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {studentData.university === "自定义" && (
              <div>
                <Label htmlFor="customUniversity">自定义大学名称</Label>
                <Input
                  id="customUniversity"
                  value={studentData.customUniversity}
                  onChange={(e) => setStudentData((prev) => ({ ...prev, customUniversity: e.target.value }))}
                  placeholder="输入自定义大学名称"
                />
              </div>
            )}

            <div>
              <Label htmlFor="major">专业</Label>
              <Select
                value={studentData.major}
                onValueChange={(value) => setStudentData((prev) => ({ ...prev, major: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择专业" />
                </SelectTrigger>
                <SelectContent>
                  {majors.map((major) => (
                    <SelectItem key={major} value={major}>
                      {major}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="year">入学年份</Label>
              <Input
                id="year"
                type="number"
                value={studentData.year}
                onChange={(e) => setStudentData((prev) => ({ ...prev, year: e.target.value }))}
                placeholder="输入入学年份"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issueDate">发证日期</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={studentData.issueDate}
                  onChange={(e) => setStudentData((prev) => ({ ...prev, issueDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="expirationDate">有效期至</Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={studentData.expirationDate}
                  onChange={(e) => setStudentData((prev) => ({ ...prev, expirationDate: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="studentSignature">学生签名</Label>
              <Input
                id="studentSignature"
                value={studentData.studentSignature}
                onChange={(e) => setStudentData((prev) => ({ ...prev, studentSignature: e.target.value }))}
                placeholder="输入学生签名"
              />
            </div>

            <div>
              <Label htmlFor="photo">学生照片</Label>
              <div className="flex items-center gap-2">
                <Input id="photo" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("photo")?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  上传照片
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {showPreview && (
        <Card>
          <CardHeader>
            <CardTitle>学生证预览</CardTitle>
            <CardDescription>预览生成的学生证效果</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={cardSide} onValueChange={(value) => setCardSide(value as "front" | "back")}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="front">正面</TabsTrigger>
                <TabsTrigger value="back">背面</TabsTrigger>
              </TabsList>

              <TabsContent value="front">
                <div className="flex justify-center">
                  <div className="w-80 h-52 bg-white rounded-lg shadow-xl border overflow-hidden relative">
                    <div className="w-full h-12 bg-red-600 flex items-center justify-center">
                      <div className="text-center">
                        <h2 className="text-white font-bold text-sm leading-tight university-header">
                          {getUniversityName()} {/* Use helper function for university name */}
                        </h2>
                        <p className="text-white text-xs font-medium clean-official">INTERNATIONAL STUDENT ID CARD</p>
                      </div>
                    </div>

                    <div className="p-4 flex gap-4">
                      <div className="w-20 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {studentData.studentPhoto ? (
                          <img
                            src={studentData.studentPhoto || "/placeholder.svg"}
                            alt="Student"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-500">PHOTO</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="space-y-2">
                          <div>
                            <div className="text-xs text-gray-600 font-medium modern-academic">NAME</div>
                            <div className="text-sm font-bold text-gray-900 clean-official">
                              {studentData.studentName || "Student Name"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 font-medium modern-academic">STUDENT ID</div>
                            <div className="text-sm font-bold text-gray-900 clean-official">
                              {studentData.studentId || "INT000000"}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 font-medium modern-academic">FACULTY</div>
                            <div className="text-xs text-gray-900 clean-official">
                              {studentData.major || "Faculty of Economics and Management"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-600">
                      <div>
                        <span className="font-medium certificate-text">ISSUE</span>
                        <div className="text-gray-900 clean-official">{studentData.issueDate}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium certificate-text">VALID</span>
                        <div className="text-gray-900 clean-official">{studentData.expirationDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="back">
                <div className="flex justify-center">
                  <div className="w-80 h-60 bg-white rounded-lg shadow-xl border overflow-hidden relative">
                    {/* Magnetic strip */}
                    <div className="absolute top-0 left-0 right-0 h-3 bg-black"></div>
                    
                    {/* Content container with proper spacing */}
                    <div className="pt-6 px-4 pb-4 h-full flex flex-col">
                      {/* Header */}
                      <div className="text-center mb-3">
                        <h3 className="text-sm font-bold text-gray-800 document-title uppercase tracking-wide">
                          Terms & Conditions
                        </h3>
                        <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-1"></div>
                      </div>

                      {/* Terms content */}
                      <div className="flex-1 mb-4">
                        <div className="text-xs text-gray-700 leading-relaxed official-text space-y-2">
                          <p>This card is the property of {getUniversityName()} and must be returned upon request.</p>
                          <p>Misuse of this card may result in disciplinary action. Report lost or stolen cards immediately.</p>
                        </div>
                      </div>

                      {/* Signature section - now guaranteed to be visible */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="mb-2">
                          <div className="text-xs text-gray-600 font-medium certificate-text uppercase tracking-wide">
                            Student Signature
                          </div>
                        </div>
                        
                        {/* Signature line with more space */}
                        <div className="bg-white rounded border border-gray-300 p-2 min-h-[48px] flex items-center justify-center">
                          {studentData.studentSignature ? (
                            <span className="font-signature-handwriting text-xl text-blue-900 transform -rotate-1 signature-handwriting-text">
                              {studentData.studentSignature}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400 italic modern-academic">
                              Please sign here
                            </span>
                          )}
                        </div>
                        
                        {/* Date information */}
                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200">
                          <div className="text-xs">
                            <span className="text-gray-500 font-medium certificate-text">ISSUED:</span>
                            <span className="ml-1 text-gray-800 clean-official">{studentData.issueDate}</span>
                          </div>
                          <div className="text-xs text-right">
                            <span className="text-gray-500 font-medium certificate-text">EXPIRES:</span>
                            <span className="ml-1 text-gray-800 clean-official">{studentData.expirationDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
