import GuideDetails from "@/components/travel-guide-details/GuideDetails"


interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function GuideDetailsPage({ params }: Props) {
  const { id } = await params
  return <div className="pt-18">
    <GuideDetails id={id} />
  </div>
}
