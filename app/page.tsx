"use client"

import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Award, CreditCard } from "lucide-react"
import { TranscriptGenerator } from "@/components/transcript-generator"
import { AdmissionLetterGenerator } from "@/components/admission-letter-generator"
import { StudentIdGenerator } from "@/components/student-id-generator"

export default function DocumentGenerator() {
  const [activeTab, setActiveTab] = useState("transcript")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-serif text-foreground">学术文档生成器</h1>
                <p className="text-sm text-muted-foreground">专业美国大学文档创建工具</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              免费使用
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-serif text-foreground mb-4">选择要生成的文档类型</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              生成逼真的美国大学文档，包括学生证、成绩单和录取通知书。所有信息都可以自定义，并提供真实的示例数据。
            </p>
          </div>

          {/* Document Type Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeTab === "student-id" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveTab("student-id")}
            >
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>学生证</CardTitle>
                <CardDescription>创建真实的美国大学学生证，包含照片、学号和官方认证信息</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeTab === "transcript" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveTab("transcript")}
            >
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>官方成绩单</CardTitle>
                <CardDescription>创建详细的学术成绩单，包含课程成绩、GPA计算和官方大学格式</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeTab === "admission" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveTab("admission")}
            >
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>录取通知书</CardTitle>
                <CardDescription>生成正式的大学录取通知书，包含专业详情、开学日期和官方签名</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Document Generators */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="student-id" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                学生证
              </TabsTrigger>
              <TabsTrigger value="transcript" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                成绩单
              </TabsTrigger>
              <TabsTrigger value="admission" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                录取通知书
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student-id">
              <StudentIdGenerator />
            </TabsContent>

            <TabsContent value="transcript">
              <TranscriptGenerator />
            </TabsContent>

            <TabsContent value="admission">
              <AdmissionLetterGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">© 2024 学术文档生成器 - 仅供教育和演示目的使用</p>
            <p className="text-sm">请勿用于任何非法目的。生成的文档仅为演示模板。</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
