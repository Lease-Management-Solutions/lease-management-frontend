export const getCookie = (name: string): string | undefined => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : undefined;
    }
    return undefined;
  };
  