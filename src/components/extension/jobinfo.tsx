const JobInfo = ({ generateResumeDetails}) => {
  return (
    <div>
      <span>Enter Job Information</span>
      <textarea></textarea>
      <button onClick={generateResumeDetails}>Next</button>
    </div>
  )
}

export default JobInfo
