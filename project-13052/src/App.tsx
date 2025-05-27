import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient} data-id="rpodin7s5" data-path="src/App.tsx">
    <TooltipProvider data-id="bqm86o9yo" data-path="src/App.tsx">
      <Toaster data-id="mfhkjamke" data-path="src/App.tsx" />
      <BrowserRouter data-id="g2omfeemf" data-path="src/App.tsx">
        <Routes data-id="8vem8zir1" data-path="src/App.tsx">
          <Route path="/" element={<HomePage data-id="yes8v5dlp" data-path="src/App.tsx" />} data-id="pjfbjm31l" data-path="src/App.tsx" />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound data-id="o9w6r088e" data-path="src/App.tsx" />} data-id="m6gsb9w14" data-path="src/App.tsx" />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;