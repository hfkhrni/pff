'use client';

import { Button } from '@/components/ui/button';
import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeDetector } from 'react-resize-detector';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Fullscreen,
  Plus,
  ScanEye,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import page from '../page';
import { cn } from '@/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import SimpleBar from 'simplebar-react';
import PDFFullscreen from './pdf-fullscreen';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

function PDFRenderer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const { ref, width, height } = useResizeDetector();
  const [renderedScale, setRenderedScale] = useState<number | null>(null);
  const isLoading = renderedScale !== scale;

  const { toast } = useToast();

  const PageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  type TPageValidator = z.infer<typeof PageValidator>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TPageValidator>({
    defaultValues: {
      page: '1',
    },
    resolver: zodResolver(PageValidator),
  });

  const handlePageSubmit = ({ page }: TPageValidator) => {
    setCurrPage(Number(page));
    setValue('page', String(page));
  };
  return (
    <div className="flex h-full flex-col items-center rounded-sm bg-secondary font-mono">
      {/* h-full can be added here */}
      <div className="m-2 flex w-[calc(100%-1rem)] items-center justify-between rounded-sm bg-background px-2">
        <div className="flex items-center gap-1">
          <Button
            disabled={currPage === 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue('page', String(currPage - 1));
            }}
            aria-label="Previous Page"
            variant="ghost"
            className="hover:bg-transparent focus-visible:ring-offset-0"
          >
            <ChevronDown className="h-4 w-4 rounded-sm hover:bg-secondary/50" />
          </Button>
          <div className="flex items-center gap-1">
            <Input
              {...register('page')}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSubmit(handlePageSubmit)();
                }
              }}
              placeholder={currPage.toString()}
              className={cn(
                'h-6 w-12 rounded-sm border-none bg-secondary focus-visible:shadow-none focus-visible:ring-transparent',
                errors.page && 'focus-visible:outline-destructive '
              )}
            />
            <p className="ml-1">
              <span className="text-sm">/ {numPages ?? 'x'}</span>
            </p>
          </div>
          <Button
            disabled={numPages === currPage || numPages === undefined}
            aria-label="Next Page"
            variant="ghost"
            className="hover:bg-transparent focus-visible:ring-offset-0"
          >
            <ChevronUp
              onClick={() => {
                setCurrPage((prev) =>
                  prev + 1 > numPages! ? numPages! : prev + 1
                );
                setValue('page', String(currPage + 1));
              }}
              className="h-4 w-4 rounded-sm hover:bg-secondary/50"
            />
          </Button>
        </div>

        <div className="flex ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                aria-label="Download PDF"
                className="h-10 border-none px-0 text-sm font-normal hover:bg-secondary/10 focus-visible:ring-offset-0 lg:px-2"
              >
                {scale * 100}%
                <ChevronDown
                  strokeWidth={1}
                  className="ml-1 w-4"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background">
              <DropdownMenuLabel className="font-mono text-xs font-thin tracking-wide text-primary/70">
                ZOOM
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-secondary" />
              <DropdownMenuItem
                onSelect={() => setScale(1)}
                className="font-mono focus:bg-secondary"
              >
                100%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(1.5)}
                className="font-mono focus:bg-secondary"
              >
                150%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(2)}
                className="font-mono focus:bg-secondary"
              >
                200%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(2.5)}
                className="font-mono focus:bg-secondary"
              >
                250%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(3)}
                className="font-mono focus:bg-secondary"
              >
                300%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <PDFFullscreen fileUrl={url} />
        </div>
      </div>
      <div className="max-h-screen w-[calc(100vw-4rem)] flex-1 sm:w-[calc(100%-2rem)]">
        <SimpleBar
          autoHide={false}
          className="max-h-[calc(100vh-24rem)] sm:max-h-[calc(100vh-16rem)]"
        >
          <div ref={ref}>
            <Document
              file={url}
              className="w-full"
              loading={
                <div className="text-center font-mono text-sm">LOADING PDF</div>
              }
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={() =>
                toast({
                  variant: 'destructive',
                  title: 'Error loading PDF',
                })
              }
            >
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  scale={scale}
                  pageNumber={currPage}
                  key={'#' + renderedScale}
                />
              ) : null}

              <Page
                className={cn(isLoading ? 'hidden' : '')}
                width={width ? width : 1}
                height={height ? height : 1}
                scale={scale}
                pageNumber={currPage}
                key={'#' + scale}
                loading={
                  <div className="text-center font-mono text-sm">
                    LOADING PAGE
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />

              {/* <Page
                width={width ? width : 1}
                scale={scale}
                pageNumber={currPage}
                key={'#' + renderedScale}
              /> */}
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}

export default PDFRenderer;
