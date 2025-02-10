import { useState, useRef, useCallback, useEffect } from 'react';
import { createElement } from 'react';
import RepoLink from './RepoLink';

export const useConsole = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<string | React.ReactNode>>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  useRef(0);
  useRef(0);
  const scrollTimeoutRef = useRef<number>();

  const scrollToBottom = useCallback((smooth = true) => {
    if (!historyRef.current) return;

    const scrollOptions: ScrollToOptions = {
      top: historyRef.current.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    };

    historyRef.current.scrollTo(scrollOptions);
  }, []);

  const addToHistory = useCallback((message: string | React.ReactNode) => {
    setHistory(prev => [...prev, message]);
    
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [scrollToBottom]);

  const handleCommand = useCallback((cmd: string) => {
    if (cmd.toLowerCase().trim() === 'show source') {
      addToHistory('Source code repository:');
      addToHistory(createElement(RepoLink));
    } else {
      addToHistory(`Command not found: ${cmd}`);
      addToHistory('Available commands:');
      addToHistory('  show source - Display the source code repository');
    }
    setInput('');
  }, [addToHistory]);

  const handleScroll = useCallback(() => {
    if (!historyRef.current) return;

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    setIsScrolling(true);

    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, 150) as unknown as number;

    const { scrollTop, scrollHeight, clientHeight } = historyRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;

    if (isNearBottom) {
      scrollToBottom(false);
    }
  }, [scrollToBottom]);

  const handleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsExpanded(false);
    setIsActive(false);
    if (inputRef.current) {
      inputRef.current.blur(); 
    }
  }, []);

  const handleConsoleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsActive(true);
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleToggleConsole = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsExpanded(prev => !prev);
    setIsActive(true);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
      e.preventDefault();
      addToHistory(`> ${input}`);
      handleCommand(input);
    }
  }, [input, handleCommand, addToHistory]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setIsExpanded(!isMobileView);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (historyRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          historyRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [handleScroll]);

  useEffect(() => {
    setTimeout(() => {
      addToHistory('Welcome to the Source Code Console!');
      addToHistory('');
      addToHistory('Available commands:');
      addToHistory('  show source - Display the source code repository');
    }, 500);
  }, [addToHistory]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (consoleRef.current && !consoleRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isActive && isExpanded) {
      document.body.classList.add('console-active');
    } else {
      document.body.classList.remove('console-active');
    }

    return () => {
      document.body.classList.remove('console-active');
    };
  }, [isActive, isExpanded]);

  return {
    isExpanded,
    isActive,
    input,
    history,
    inputRef,
    consoleRef,
    historyRef,
    isMobile,
    isScrolling,
    handleMinimize,
    handleConsoleClick,
    handleToggleConsole,
    handleInputChange,
    handleKeyPress,
    scrollToBottom
  };
};