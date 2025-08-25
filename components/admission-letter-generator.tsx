"use client"

import type React from "react"

import { useState, useRef } from "react"
import html2canvas from "html2canvas"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Eye, RefreshCw, Upload } from "lucide-react"

const generateRandomAdmission = () => {
  const names = ["John Smith", "Emily Johnson", "Michael Brown", "Sarah Davis", "David Wilson", "Jessica Miller"]
  const universities = [
    "Harvard University",
    "Stanford University",
    "MIT",
    "Yale University",
    "Princeton University",
    "Columbia University",
  ]
  const majors = [
    "Computer Science",
    "Business Administration",
    "Psychology",
    "Biology",
    "Economics",
    "Political Science",
    "Engineering",
  ]
  const degrees = [
    "Bachelor of Science",
    "Bachelor of Arts",
    "Master of Science",
    "Master of Arts",
    "Doctor of Philosophy",
  ]
  const deans = [
    "Dr. Robert Johnson",
    "Dr. Sarah Williams",
    "Dr. Michael Davis",
    "Dr. Jennifer Brown",
    "Dr. David Miller",
  ]

  return {
    studentName: names[Math.floor(Math.random() * names.length)],
    university: universities[Math.floor(Math.random() * universities.length)],
    major: majors[Math.floor(Math.random() * majors.length)],
    degree: degrees[Math.floor(Math.random() * degrees.length)],
    admissionYear: new Date().getFullYear().toString(),
    startDate: `${new Date().getFullYear()}-08-28`,
    dean: deans[Math.floor(Math.random() * deans.length)],
    letterNumber: `ADM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    issueDate: new Date().toISOString().split("T")[0],
  }
}

export function AdmissionLetterGenerator() {
  const [formData, setFormData] = useState(generateRandomAdmission())
  const [schoolLogo, setSchoolLogo] = useState<string | null>(null)
  const [customMessage, setCustomMessage] = useState(
    "We are delighted to inform you of your acceptance to our university. We look forward to welcoming you to our academic community.",
  )
  const letterRef = useRef<HTMLDivElement>(null)

  const downloadLetter = async () => {
    if (letterRef.current) {
      const canvas = await html2canvas(letterRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      })
      
      const link = document.createElement('a')
      link.download = `录取通知书_${formData.studentName || 'Student'}_${formData.university || 'University'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSchoolLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const randomizeData = () => {
    setFormData(generateRandomAdmission())
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            录取通知书信息
            <Button variant="outline" size="sm" onClick={randomizeData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              随机生成
            </Button>
          </CardTitle>
          <CardDescription>填写录取通知书信息或使用随机生成的示例数据</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentName">学生姓名</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => handleInputChange("studentName", e.target.value)}
                placeholder="输入学生姓名"
              />
            </div>
            <div>
              <Label htmlFor="letterNumber">通知书编号</Label>
              <Input
                id="letterNumber"
                value={formData.letterNumber}
                onChange={(e) => handleInputChange("letterNumber", e.target.value)}
                placeholder="输入通知书编号"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="university">大学名称</Label>
            <Input
              id="university"
              value={formData.university}
              onChange={(e) => handleInputChange("university", e.target.value)}
              placeholder="输入大学名称"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="major">专业项目</Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => handleInputChange("major", e.target.value)}
                placeholder="输入专业项目"
              />
            </div>
            <div>
              <Label htmlFor="degree">学位等级</Label>
              <Select value={formData.degree} onValueChange={(value) => handleInputChange("degree", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择学位等级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bachelor of Science">理学学士</SelectItem>
                  <SelectItem value="Bachelor of Arts">文学学士</SelectItem>
                  <SelectItem value="Master of Science">理学硕士</SelectItem>
                  <SelectItem value="Master of Arts">文学硕士</SelectItem>
                  <SelectItem value="Doctor of Philosophy">哲学博士</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="admissionYear">录取年份</Label>
              <Input
                id="admissionYear"
                value={formData.admissionYear}
                onChange={(e) => handleInputChange("admissionYear", e.target.value)}
                placeholder="输入录取年份"
              />
            </div>
            <div>
              <Label htmlFor="startDate">项目开始日期</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dean">招生院长</Label>
              <Input
                id="dean"
                value={formData.dean}
                onChange={(e) => handleInputChange("dean", e.target.value)}
                placeholder="输入院长姓名"
              />
            </div>
            <div>
              <Label htmlFor="issueDate">发布日期</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => handleInputChange("issueDate", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="customMessage">自定义消息</Label>
            <Textarea
              id="customMessage"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="输入自定义祝贺消息"
              rows={3}
            />
          </div>

          <div>
            <Label>大学标志</Label>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="schoolLogo" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  上传标志
                </label>
              </Button>
              <input id="schoolLogo" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              {schoolLogo && (
                <div className="w-12 h-12 rounded border overflow-hidden">
                  <img
                    src={schoolLogo || "/placeholder.svg"}
                    alt="University logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1" variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              预览通知书
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={downloadLetter}>
              <Download className="w-4 h-4 mr-2" />
              下载PNG
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Admission Letter Preview</CardTitle>
          <CardDescription>Real-time preview of the generated admission letter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-primary/20">
            <div ref={letterRef} className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              {/* Official Header */}
              <div className="text-center border-b-2 border-blue-800 pb-6 mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  {schoolLogo ? (
                    <img
                      src={schoolLogo || "/placeholder.svg"}
                      alt="University logo"
                      className="w-20 h-20 object-contain"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-bold">SEAL</span>
                    </div>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-blue-900 font-serif mb-2">{formData.university}</h1>
                <h2 className="text-lg font-semibold text-blue-700 tracking-wider">OFFICE OF ADMISSIONS</h2>
              </div>

              {/* Letter Content */}
              <div className="space-y-6 text-gray-800 leading-relaxed">
                <div className="text-right text-sm text-gray-600 mb-6">
                  <p>Reference: {formData.letterNumber}</p>
                  <p>{formData.issueDate}</p>
                </div>

                <div className="text-lg">
                  <p className="mb-4">
                    Dear <span className="font-bold">{formData.studentName}</span>,
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-lg font-semibold text-blue-800">
                    Congratulations! We are pleased to inform you that you have been accepted for admission to{" "}
                    {formData.university}.
                  </p>

                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <h3 className="font-bold text-blue-800 mb-3">ADMISSION DETAILS</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p>
                          <span className="font-medium">Program:</span> {formData.degree}
                        </p>
                        <p>
                          <span className="font-medium">Major:</span> {formData.major}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-medium">Academic Year:</span> {formData.admissionYear}
                        </p>
                        <p>
                          <span className="font-medium">Start Date:</span> {formData.startDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p>{customMessage}</p>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-2">NEXT STEPS:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Confirm your enrollment by the deadline specified in your enrollment packet</li>
                      <li>• Submit your enrollment deposit to secure your place</li>
                      <li>• Complete housing and meal plan applications if applicable</li>
                      <li>• Attend orientation sessions before classes begin</li>
                    </ul>
                  </div>

                  <p className="text-sm text-gray-600">
                    We look forward to welcoming you to our academic community. Should you have any questions, please do
                    not hesitate to contact our Admissions Office.
                  </p>
                </div>

                {/* Signature Section */}
                <div className="pt-8 mt-8 border-t">
                  <div className="flex justify-between items-end">
                    <div className="text-sm text-gray-600">
                      <p>Sincerely,</p>
                      <div className="mt-8">
                        <div className="w-48 border-b border-gray-400 mb-2"></div>
                        <p className="font-bold">{formData.dean}</p>
                        <p>Dean of Admissions</p>
                        <p className="text-xs mt-2">{formData.university}</p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <div className="w-16 h-16 border-2 border-blue-200 rounded-full flex items-center justify-center mb-2">
                        <span className="text-blue-600 font-bold">SEAL</span>
                      </div>
                      <p>Official University Seal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
