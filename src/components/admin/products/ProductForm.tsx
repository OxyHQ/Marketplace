"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import Link from "next/link"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button, buttonVariants } from "@/components/ui/button"

import { InsertProducts, SelectProducts, products } from "@/lib/supabase/schema"
import { Icons } from "@/components/icons"
import TagsField from "@/components/ui/tagsField"
import FeaturedImageField from "@/components/media/FeaturedImageField"

type ProductsFormProps = {
  product?: SelectProducts
}

function ProductFrom({ product }: ProductsFormProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<InsertProducts>({
    resolver: zodResolver(createInsertSchema(products)),
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = handleSubmit(async (data: InsertProducts) => {
    console.log("data", data)

    startTransition(async () => {
      // try {
      //   category
      //     ? await editCategoryAction(category.id, data)
      //     : await addCategoryAction(data)
      // } catch (err) {
      //   console.log("unexpected Error Occured")
      // }
    })
  })

  return (
    <Form {...form}>
      <form
        id="project-form"
        className="gap-x-5 flex gap-y-5 flex-col"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-y-5">
          <FormItem>
            <FormLabel className="text-sm">name*</FormLabel>
            <FormControl>
              <Input
                defaultValue={product?.name}
                aria-invalid={!!form.formState.errors.name}
                placeholder="Type Product Name."
                {...register("name")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm">Slug*</FormLabel>
            <FormControl>
              <Input
                defaultValue={product?.slug}
                aria-invalid={!!form.formState.errors.slug}
                placeholder="Type Product slug."
                {...register("slug")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm">Description*</FormLabel>
            <FormControl>
              <Input
                defaultValue={product?.description || ""}
                aria-invalid={!!form.formState.errors.description}
                placeholder="Type a short description for the product.."
                {...register("description")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    defaultChecked={false}
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured*</FormLabel>
                  <FormDescription>
                    You can manage your mobile notifications in the{" "}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="badge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badge</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Add a badge for the Product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="new_product">New Product</SelectItem>
                    <SelectItem value="best_sale">Best Sale</SelectItem>
                    <SelectItem value="featured">featured</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select a Badge if you want the Product card attached a badge.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel className="text-sm">Rating*</FormLabel>
            <FormControl>
              <Input
                defaultValue={product?.rating}
                aria-invalid={!!form.formState.errors.rating}
                placeholder="Rating (0-5)."
                {...register("rating")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm">Tags</FormLabel>
            <FormControl>
              <TagsField name={"tags"} defaultValue={product?.tags || []} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm">Price*</FormLabel>
            <FormControl>
              <Input
                defaultValue={product?.price}
                aria-invalid={!!form.formState.errors.price}
                placeholder="Price"
                {...register("price")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm">FeaturedImageId*</FormLabel>
            <FormControl>
              <Input
                defaultValue={product?.featuredImageId}
                aria-invalid={!!form.formState.errors.featuredImageId}
                placeholder="featuredImageId"
                {...register("featuredImageId", { valueAsNumber: true })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm">Featured Image</FormLabel>
            <FormControl>
              <FeaturedImageField
                name={"featuredImage"}
                defaultValue={product?.featuredImageId}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>

        <div className="py-8 flex gap-x-5 items-center">
          <Button disabled={isPending} variant={"outline"} form="project-form">
            {product ? "Update" : "Create"}
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
          </Button>
          <Link href="/admin/categories" className={buttonVariants()}>
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default ProductFrom