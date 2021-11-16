import loadScript from "../loadScript";

it("resolves once the script is loaded", async () => {
  // Trigger a load event once added
  function mockAppendedScript(script: HTMLScriptElement) {
    script.dispatchEvent(new Event("load"));
  }
  jest
    .spyOn(document.body, "appendChild")
    .mockImplementation(mockAppendedScript as any);

  await loadScript("uniqueID", "http://www.example.com");
});

it("throws if the script fails to load", async () => {
  // Trigger an error event once added
  function mockAppendedScript(script: HTMLScriptElement) {
    script.dispatchEvent(new Event("error"));
  }
  jest
    .spyOn(document.body, "appendChild")
    .mockImplementation(mockAppendedScript as any);

  await expect(() =>
    loadScript("uniqueID", "http://www.example.com")
  ).rejects.toThrow();
});

it("de-duplicates loading", async () => {
  jest
    .spyOn(document, "getElementById")
    .mockReturnValue(document.createElement("script"));

  const mockAppendChild = jest.fn();
  jest.spyOn(document.body, "appendChild").mockImplementation(mockAppendChild);

  await loadScript("uniqueID", "http://www.example.com");
  expect(mockAppendChild).not.toHaveBeenCalled();
});
