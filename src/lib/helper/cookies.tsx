export const setCookies = (name: string, value: any) => {
  const cookiesValue = JSON.stringify(value);
  document.cookie = `${name}=${cookiesValue}; path=/`;
}

export const getCookies = (name: string): string | null => {
  if (typeof document === 'undefined') {
    // Jika di server-side, kembalikan null atau nilai default lainnya
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};