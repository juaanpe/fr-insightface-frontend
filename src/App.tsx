import { useState } from 'react'
import CompareTab from './components/CompareTab'
import RecognitionTab from './components/RecognitionTab'
import Layout from './components/Layout'

function App() {
  const [activeTab, setActiveTab] = useState<'compare' | 'recognition'>('compare')

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'compare' ? <CompareTab /> : <RecognitionTab />}
    </Layout>
  )
}

export default App
