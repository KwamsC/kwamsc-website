import { db } from "../config/db.ts";

const VERSIONS_COLLECTION = "metadata";

/**
 * Increments the version counter for a given resource type
 * @param resourceType - The type of resource (e.g., 'posts', 'recipes')
 * @returns The new version number
 */
export const incrementVersion = async (
  resourceType: string
): Promise<number> => {
  const versionDocRef = db.collection(VERSIONS_COLLECTION).doc(resourceType);

  try {
    const result = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(versionDocRef);

      const currentVersion = doc.exists ? (doc.data()?.version || 0) : 0;
      const newVersion = currentVersion + 1;

      transaction.set(
        versionDocRef,
        { version: newVersion, updatedAt: Date.now() },
        { merge: true }
      );

      return newVersion;
    });

    return result;
  } catch (error) {
    console.error("Error incrementing version:", error);
    // Return timestamp as fallback version
    return Date.now();
  }
};

/**
 * Gets the current version for a resource type
 * @param resourceType - The type of resource (e.g., 'posts', 'recipes')
 * @returns The current version number
 */
export const getVersion = async (resourceType: string): Promise<number> => {
  const versionDocRef = db.collection(VERSIONS_COLLECTION).doc(resourceType);

  try {
    const doc = await versionDocRef.get();
    return doc.exists ? (doc.data()?.version || 0) : 0;
  } catch (error) {
    console.error("Error getting version:", error);
    // Return timestamp as fallback
    return Date.now();
  }
};
