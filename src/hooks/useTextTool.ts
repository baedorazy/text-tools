import { useState, useMemo, useCallback } from 'react';

interface UseTextToolOptions<T> {
  initialOptions: T;
  transform: (input: string, options: T) => string;
}

export function useTextTool<T>({ initialOptions, transform }: UseTextToolOptions<T>) {
  const [input, setInput]     = useState('');
  const [options, setOptions] = useState<T>(initialOptions);

  const output = useMemo(
    () => (input ? transform(input, options) : ''),
    [input, options, transform],
  );

  const setOption = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearInput = useCallback(() => setInput(''), []);

  const copyOutput = useCallback(() => {
    if (output) navigator.clipboard.writeText(output);
  }, [output]);

  const downloadOutput = useCallback((filename = 'texttools-output.txt') => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [output]);

  return { input, setInput, output, options, setOption, clearInput, copyOutput, downloadOutput };
}
