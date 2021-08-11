/**
 * Helper to load a script in the browser
 */
export default async function loadScript(
  id: string,
  url: string
): Promise<void> {
  // Don't run if the script already exists
  const exists = document.getElementById(id);
  if (exists) return;

  const isReady = new Promise<void>((resolve) => {
    // Create the script
    const scriptElement = document.createElement("script");
    scriptElement.src = url;
    scriptElement.async = true;
    scriptElement.type = "text/javascript";
    scriptElement.id = id;
    function handleLoad() {
      resolve();
    }
    scriptElement.addEventListener("load", handleLoad);
    document.body.appendChild(scriptElement);
    console.log("appended");

    // Set event listener
  });

  await isReady;
}
