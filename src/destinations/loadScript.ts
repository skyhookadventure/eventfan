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
    document.body.appendChild(scriptElement);

    function handleLoad() {
      resolve();
    }

    // Set event listener
    scriptElement.addEventListener("load", handleLoad);
  });

  await isReady;
}
