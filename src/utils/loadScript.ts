/**
 * Helper to load a script in the browser
 *
 * @param id Unique ID for the script to be loaded
 * @param url Fully qualified URL of the script
 */
export default async function loadScript(
  id: string,
  url: string
): Promise<void> {
  // Don't run if the script already exists
  const exists = document.getElementById(id);
  if (exists) return;

  const isReady = new Promise<void>((resolve, reject) => {
    // Create the script
    const scriptElement = document.createElement("script");
    scriptElement.src = url;
    scriptElement.async = true;
    scriptElement.type = "text/javascript";
    scriptElement.id = id;

    // Reject the promise if it fails to load
    scriptElement.addEventListener("error", () => {
      reject(new Error(`Failed to load ${url}`));
    });

    // Resolve the promise once loaded
    scriptElement.addEventListener("load", () => resolve());

    // Append the script to the body
    document.body.appendChild(scriptElement);
  });

  await isReady;
}
