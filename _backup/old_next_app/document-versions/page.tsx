import { getVersionMetadata, getAllDocumentVersions, getAllSectionVersions } from "@/lib/version-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, FileIcon, BookIcon, BarChartIcon, FileDigitIcon } from "lucide-react"

export default async function DocumentVersionsPage() {
  const metadata = await getVersionMetadata()
  const documentVersions = await getAllDocumentVersions()
  const sectionVersions = await getAllSectionVersions()

  // Group document versions by type
  const groupedDocVersions = documentVersions.reduce(
    (acc, version) => {
      if (!acc[version.documentType]) {
        acc[version.documentType] = []
      }
      acc[version.documentType].push(version)
      return acc
    },
    {} as Record<string, typeof documentVersions>,
  )

  // Sort versions by release date (newest first)
  Object.keys(groupedDocVersions).forEach((key) => {
    groupedDocVersions[key].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
  })

  // Group section versions by version
  const groupedSectionVersions = sectionVersions.reduce(
    (acc, section) => {
      if (!acc[section.version]) {
        acc[section.version] = []
      }
      acc[section.version].push(section)
      return acc
    },
    {} as Record<string, typeof sectionVersions>,
  )

  const documentTypeIcons = {
    whitepaper: <FileIcon className="h-5 w-5" />,
    litepaper: <BookIcon className="h-5 w-5" />,
    tokenomics: <BarChartIcon className="h-5 w-5" />,
    executiveSummary: <FileDigitIcon className="h-5 w-5" />,
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Document Versions</h1>
        <p className="text-muted-foreground">Browse all available versions of our documentation</p>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Version Information</CardTitle>
            <CardDescription>Current version status and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium mb-2">Current Version</h3>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  v{metadata.currentVersion}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Latest Versions</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileIcon className="h-4 w-4" />
                    <span className="text-sm">Whitepaper:</span>
                    <Badge>v{metadata.latestVersions.whitepaper}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookIcon className="h-4 w-4" />
                    <span className="text-sm">Litepaper:</span>
                    <Badge>v{metadata.latestVersions.litepaper}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChartIcon className="h-4 w-4" />
                    <span className="text-sm">Tokenomics:</span>
                    <Badge>v{metadata.latestVersions.tokenomics}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileDigitIcon className="h-4 w-4" />
                    <span className="text-sm">Executive Summary:</span>
                    <Badge>v{metadata.latestVersions.executiveSummary}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">All Versions</h3>
                <div className="flex flex-wrap gap-2">
                  {metadata.versions.map((version) => (
                    <Badge key={version} variant="outline">
                      v{version}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="whitepaper">
        <TabsList className="mb-6">
          <TabsTrigger value="whitepaper">Whitepaper</TabsTrigger>
          <TabsTrigger value="litepaper">Litepaper</TabsTrigger>
          <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
          <TabsTrigger value="executiveSummary">Executive Summary</TabsTrigger>
        </TabsList>

        {(["whitepaper", "litepaper", "tokenomics", "executiveSummary"] as const).map((docType) => (
          <TabsContent key={docType} value={docType}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groupedDocVersions[docType]?.map((version) => (
                <Card key={version.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {documentTypeIcons[docType]}
                        <CardTitle>v{version.version}</CardTitle>
                      </div>
                      {version.isLatest && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 flex items-center"
                        >
                          <CheckIcon className="h-3 w-3 mr-1" />
                          Latest
                        </Badge>
                      )}
                    </div>
                    <CardDescription>Released: {new Date(version.releaseDate).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Sections</h3>
                        <p className="text-sm text-muted-foreground">{version.sections.length} sections included</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-1">Changelog</h3>
                        <div className="text-sm text-muted-foreground prose-sm max-h-24 overflow-y-auto">
                          {version.changelog ? (
                            <p>{version.changelog}</p>
                          ) : (
                            <p className="italic">No changelog provided</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <a
                          href={`/?version=${version.version}&type=${docType}`}
                          className="text-sm text-primary hover:underline"
                        >
                          View this version
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(!groupedDocVersions[docType] || groupedDocVersions[docType].length === 0) && (
                <div className="col-span-full text-center p-8">
                  <p>No versions available for {docType}</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Section Versions</h2>

        <Tabs defaultValue={metadata.currentVersion}>
          <TabsList className="mb-6">
            {metadata.versions.map((version) => (
              <TabsTrigger key={version} value={version}>
                v{version}
              </TabsTrigger>
            ))}
          </TabsList>

          {metadata.versions.map((version) => (
            <TabsContent key={version} value={version}>
              <div className="grid gap-4">
                {groupedSectionVersions[version]?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Section</th>
                          <th className="text-left py-3 px-4">Path</th>
                          <th className="text-left py-3 px-4">Document Types</th>
                          <th className="text-left py-3 px-4">Last Updated</th>
                          <th className="text-left py-3 px-4">Tags</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedSectionVersions[version]
                          .sort((a, b) => a.title.localeCompare(b.title))
                          .map((section) => (
                            <tr key={section.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">
                                <div className="font-medium">{section.title}</div>
                                <div className="text-xs text-muted-foreground">{section.sectionId}</div>
                              </td>
                              <td className="py-3 px-4">
                                <code className="text-sm bg-muted px-1 py-0.5 rounded">{section.path}</code>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-1">
                                  {section.documentTypes.map((type) => (
                                    <Badge key={type} variant="outline">
                                      {type}
                                    </Badge>
                                  ))}
                                </div>
                              </td>
                              <td className="py-3 px-4">{new Date(section.lastUpdated).toLocaleDateString()}</td>
                              <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-1">
                                  {section.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p>No sections available for version {version}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
