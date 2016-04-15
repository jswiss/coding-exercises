# require 'pdf-reader'
require 'pdf/reader/html'

pdf = PDF::Reader.new('test.pdf')
pdf.to_html

pdf.pages.each do |page|
  puts page.to_html
end
# reader = PDF::Reader.new('test.pdf')

# reader.pages.each do |page|
#   puts page.text 
# end

