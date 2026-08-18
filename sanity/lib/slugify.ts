export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')     // strip diacritics (é → e)
    .replace(/[·•°—–−×,]/g, '-')        // common special chars → hyphen
    .replace(/[^a-z0-9\s-]/g, '')        // drop everything else
    .replace(/\s+/g, '-')                // spaces → hyphens
    .replace(/-+/g, '-')                 // collapse consecutive hyphens
    .replace(/^-|-$/g, '')               // trim edge hyphens
    .slice(0, 96)
}
