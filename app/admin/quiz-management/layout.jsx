

import { QuizProvider } from "./context/QuizContext.jsx"

export default function QuizManagementLayout({ children }) {
  return <QuizProvider>{children}</QuizProvider>
}
