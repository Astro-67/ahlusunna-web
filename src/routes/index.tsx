import { createFileRoute } from '@tanstack/react-router'
import AhlusunnaLessonTabs from '../components/AhlusunnaLessonTabs'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <AhlusunnaLessonTabs />
}
