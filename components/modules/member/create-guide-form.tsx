"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TravelGuideValidationSchema,
  TravelGuideFormData,
  GuideStatus,
} from "@/zod/travel-guide.validation"
import { axiosInstance } from "@/lib/axios/httpClient"

interface Category {
  id?: string
  title?: string
  name?: string
  [key: string]: any
}

interface CreateGuideFormProps {
  categories: Category[]
}

export function CreateGuideForm({ categories }: CreateGuideFormProps) {
  const [loading, setLoading] = React.useState(false)

  const form = useForm<TravelGuideFormData>({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      destination: "",
      itinerary: [],
      status: GuideStatus.DRAFT,
      isPaid: false,
      price: undefined,
      coverImage: undefined,
      images: [],
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      try {
        const parsedPayload =
          TravelGuideValidationSchema.create.safeParse(value)

        if (!parsedPayload.success) {
          return {
            success: false,
            message: parsedPayload.error.issues[0].message,
          }
        }

        // Create FormData for multipart upload
        const formData = new FormData()

        // Add text fields
        formData.append("title", parsedPayload.data.title)
        formData.append("description", parsedPayload.data.description)
        formData.append("categoryId", parsedPayload.data.categoryId)

        if (parsedPayload.data.destination) {
          formData.append("destination", parsedPayload.data.destination)
        }

        if (
          parsedPayload.data.itinerary &&
          parsedPayload.data.itinerary.length > 0
        ) {
          formData.append(
            "itinerary",
            JSON.stringify(parsedPayload.data.itinerary)
          )
        }

        if (parsedPayload.data.status) {
          formData.append("status", parsedPayload.data.status)
        }

        if (parsedPayload.data.isPaid !== undefined) {
          formData.append("isPaid", String(parsedPayload.data.isPaid))
        }

        if (parsedPayload.data.price !== undefined) {
          formData.append("price", String(parsedPayload.data.price))
        }

        // Handle coverImage file
        if (
          parsedPayload.data.coverImage &&
          parsedPayload.data.coverImage instanceof File
        ) {
          formData.append("coverImage", parsedPayload.data.coverImage)
        }

        // Handle images files
        if (
          parsedPayload.data.images &&
          Array.isArray(parsedPayload.data.images)
        ) {
          parsedPayload.data.images.forEach((image) => {
            if (image instanceof File) {
              formData.append("images", image)
            }
          })
        }

        const res = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/travel-guides`,
          formData
        )
        console.log("Create guide response:", res)

        if (res.status === 201) {
          toast.success("Guide created successfully!")
          form.reset()
        }
      } catch (error: any) {
        console.error("Create guide error:", error)
        toast.error(
          error?.message || "An error occurred while creating the guide"
        )
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <div className="min-h-screen w-full bg-muted/10 p-6">
      <Card className="w-full max-w-none">
        <CardHeader>
          <CardTitle>Create Travel Guide</CardTitle>
          <CardDescription>
            Fill in the details to create your travel guide
          </CardDescription>
        </CardHeader>

        <form.Provider>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <CardContent className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <form.Field name="title">
                  {(field) => (
                    <Field>
                      <FieldLabel>Title *</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter guide title"
                      />
                      <FieldError
                        errors={field.state.meta.errors.map(String)}
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="description">
                  {(field) => (
                    <Field>
                      <FieldLabel>Description *</FieldLabel>
                      <Textarea
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Describe your travel guide"
                        rows={4}
                      />
                      <FieldError
                        errors={field.state.meta.errors.map(String)}
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="categoryId">
                  {(field) => (
                    <Field>
                      <FieldLabel>Category *</FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {(Array.isArray(categories) ? categories : []).map(
                            (category) => (
                              <SelectItem
                                key={String(category?.id || category)}
                                value={String(category?.id || category)}
                              >
                                {String(
                                  category?.title ||
                                    category?.name ||
                                    category ||
                                    "Unnamed"
                                )}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FieldError
                        errors={field.state.meta.errors.map(String)}
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="destination">
                  {(field) => (
                    <Field>
                      <FieldLabel>Destination</FieldLabel>
                      <Input
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter destination (optional)"
                      />
                      <FieldError
                        errors={field.state.meta.errors.map(String)}
                      />
                    </Field>
                  )}
                </form.Field>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Media & Pricing</h3>

                <form.Field name="coverImage">
                  {(field) => (
                    <Field>
                      <FieldLabel>Cover Image</FieldLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          field.handleChange(file || undefined)
                        }}
                      />
                      <FieldError
                        errors={field.state.meta.errors.map(String)}
                      />
                    </Field>
                  )}
                </form.Field>

                <Field>
                  <FieldLabel>Additional Images</FieldLabel>
                  <form.Field name="images">
                    {(field) => (
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          field.handleChange(files)
                        }}
                      />
                    )}
                  </form.Field>
                </Field>

                {/* <Field>
                  <FieldLabel>Video</FieldLabel>
                  <form.Field name="video">
                    {(field) => (
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          field.handleChange(file || undefined)
                        }}
                      />
                    )}
                  </form.Field>
                </Field> */}

                <form.Field name="isPaid">
                  {(field) => (
                    <Field>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isPaid"
                          checked={field.state.value || false}
                          onCheckedChange={(checked) =>
                            field.handleChange(!!checked)
                          }
                        />
                        <FieldLabel htmlFor="isPaid">
                          This is a paid guide
                        </FieldLabel>
                      </div>
                      <FieldError
                        errors={field.state.meta.errors.map(String)}
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="price">
                  {(field) => (
                    <Field>
                      <FieldLabel>Price (BDT)</FieldLabel>
                      <Input
                        type="number"
                        step="0.01"
                        value={field.state.value || ""}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value
                              ? parseFloat(e.target.value)
                              : undefined
                          )
                        }
                        placeholder="0.00"
                      />
                      <FieldError
                        errors={field.state.meta.errors.map(String)}
                      />
                    </Field>
                  )}
                </form.Field>

                {/* Preserve status in same right column */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Status</h3>

                  <form.Field name="status">
                    {(field) => (
                      <Field>
                        <FieldLabel>Guide Status</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) =>
                            field.handleChange(value as GuideStatus)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={GuideStatus.DRAFT}>
                              Draft
                            </SelectItem>
                            <SelectItem value={GuideStatus.UNDER_REVIEW}>
                              Under Review
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldError
                          errors={field.state.meta.errors.map(String)}
                        />
                      </Field>
                    )}
                  </form.Field>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Itinerary</h3>
                  <form.Field name="itinerary">
                    {(field) => (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const current = field.state.value || []
                          field.handleChange([
                            ...current,
                            {
                              day: current.length + 1,
                              title: "",
                              activities: [""],
                            },
                          ])
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Day
                      </Button>
                    )}
                  </form.Field>
                </div>

                <form.Field name="itinerary">
                  {(field) => (
                    <div className="space-y-4">
                      {(Array.isArray(field.state.value)
                        ? field.state.value
                        : []
                      ).map((item, index) => (
                        <Card key={index} className="p-4">
                          <div className="mb-4 flex items-center justify-between">
                            <h4 className="font-medium">Day {item.day}</h4>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const current = field.state.value || []
                                field.handleChange(
                                  current.filter((_, i) => i !== index)
                                )
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-4">
                            <Field>
                              <FieldLabel>Title *</FieldLabel>
                              <Input
                                value={item.title}
                                onChange={(e) => {
                                  const current = field.state.value || []
                                  current[index].title = e.target.value
                                  field.handleChange([...current])
                                }}
                                placeholder="Day title"
                              />
                            </Field>

                            <div className="space-y-2">
                              <FieldLabel>Activities *</FieldLabel>
                              {item.activities.map((activity, actIndex) => (
                                <div
                                  key={actIndex}
                                  className="flex items-center space-x-2"
                                >
                                  <Input
                                    value={activity}
                                    onChange={(e) => {
                                      const current = field.state.value || []
                                      current[index].activities[actIndex] =
                                        e.target.value
                                      field.handleChange([...current])
                                    }}
                                    placeholder="Activity description"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const current = field.state.value || []
                                      current[index].activities.splice(
                                        actIndex,
                                        1
                                      )
                                      field.handleChange([...current])
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const current = field.state.value || []
                                  current[index].activities.push("")
                                  field.handleChange([...current])
                                }}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Activity
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <FieldError
                        errors={field.state.meta.errors.map(String)}
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating..." : "Create Guide"}
              </Button>
            </CardFooter>
          </form>
        </form.Provider>
      </Card>
    </div>
  )
}
