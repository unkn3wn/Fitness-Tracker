export default async function allActivities() {
  const response = await fetch("/routes/activities");
  const result = await response.json();
  return result;
}

export async function activityById(activityId) {
  const response = await fetch(``);
  const result = await response.json();
  return result;
}

export async function createActivities(name, description) {
  const response = await fetch("/routes/activites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  return result;
}

export async function updateActivites(id, name, description) {
  const response = await fetch(`/routes/activites/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const result = await response.json();
  return result;
}
