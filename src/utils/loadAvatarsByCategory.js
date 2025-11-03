
export const loadAvatarsByCategory = () => {
  const categories = import.meta.glob(
    "/src/assets/avatars/*/*.{png,jpg,jpeg,webp}",
    { eager: true }
  );

  const avatarsByCategory = {};

  for (const path in categories) {
    const parts = path.split("/");
    const category = parts[parts.length - 2];
    const fileName = parts[parts.length - 1];
    const id = `${category}-${fileName}`;

    if (!avatarsByCategory[category]) avatarsByCategory[category] = [];

    avatarsByCategory[category].push({
      id,
      name: fileName.replace(/\.[^/.]+$/, ""),
      img: { url: categories[path].default },
    });
  }

  return avatarsByCategory;
};
