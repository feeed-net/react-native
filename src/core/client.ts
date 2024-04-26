export const submitFeedback = async (projectId: string, content: string) => {
  console.log(projectId, content);
  const res = await fetch('https://submit.feeed.net', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      project_id: projectId,
      content,
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}: ${await res.text()}`);
  }
};
